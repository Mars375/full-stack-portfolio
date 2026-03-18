'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { createServerSupabaseClient } from '@/lib/supabase-server'

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caracteres.'),
  email: z.string().email('Adresse email invalide.'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caracteres.'),
})

export type ContactFormState = {
  success: boolean
  error?: string
  fieldErrors?: Partial<Record<'name' | 'email' | 'message', string>>
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  }

  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: ContactFormState['fieldErrors'] = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof typeof fieldErrors
      fieldErrors[field] = issue.message
    }
    return { success: false, fieldErrors }
  }

  const { name, email, message } = parsed.data

  try {
    const supabase = createServerSupabaseClient()
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert({ name, email, message })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return { success: false, error: 'Erreur lors de l\'envoi. Reessayez plus tard.' }
    }

    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>',
        to: 'rossi.loic.pro@gmail.com',
        subject: `Nouveau message de ${name}`,
        text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Contact form error:', error)
    return { success: false, error: 'Erreur lors de l\'envoi. Reessayez plus tard.' }
  }
}
