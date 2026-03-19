'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { submitContact, type ContactFormState } from '@/app/actions/contact'
import Link from 'next/link'

const initialState: ContactFormState = { success: false }

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState)

  useEffect(() => {
    if (state.success) {
      toast.success('Message envoye ! Je vous repondrai sous 24h.')
    } else if (state.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-mono text-[11px] text-muted mb-1.5">
            name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm font-mono text-text placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
            placeholder="_"
          />
          {state.fieldErrors?.name && (
            <p className="text-error text-xs mt-1">{state.fieldErrors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block font-mono text-[11px] text-muted mb-1.5">
            email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm font-mono text-text placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
            placeholder="_"
          />
          {state.fieldErrors?.email && (
            <p className="text-error text-xs mt-1">{state.fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block font-mono text-[11px] text-muted mb-1.5">
            message:
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm font-mono text-text placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
            placeholder="_"
          />
          {state.fieldErrors?.message && (
            <p className="text-error text-xs mt-1">{state.fieldErrors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full px-5 py-2.5 bg-accent text-bg font-mono text-xs rounded-md hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? 'Envoi...' : '$ send --message'}
        </button>

        <p className="text-[10px] text-muted leading-relaxed">
          Vos donnees sont utilisees uniquement pour repondre a votre message et conservees 12 mois maximum.
          Aucun partage avec des tiers.{' '}
          <Link href="/legal" className="text-accent hover:underline">
            Mentions legales
          </Link>
        </p>
      </form>
    </div>
  )
}
