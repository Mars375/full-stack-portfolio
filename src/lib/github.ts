interface GitHubMetrics {
  repos: number | null
  commits: number | null
}

export async function fetchGitHubMetrics(): Promise<GitHubMetrics> {
  const username = process.env.GITHUB_USERNAME || 'Mars375'
  const token = process.env.GITHUB_TOKEN

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${username}`,
      { headers, next: { revalidate: 3600 } }
    )
    if (!reposRes.ok) throw new Error(`GitHub API ${reposRes.status}`)
    const userData = await reposRes.json()
    const repos = userData.public_repos ?? null

    const searchRes = await fetch(
      `https://api.github.com/search/commits?q=author:${username}&per_page=1`,
      {
        headers: { ...headers, Accept: 'application/vnd.github.cloak-preview+json' },
        next: { revalidate: 3600 },
      }
    )

    let commits: number | null = null
    if (searchRes.ok) {
      const searchData = await searchRes.json()
      commits = searchData.total_count ?? null
    }

    return { repos, commits }
  } catch (error) {
    console.error('Failed to fetch GitHub metrics:', error)
    return { repos: null, commits: null }
  }
}
