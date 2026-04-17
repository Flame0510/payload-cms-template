import Link from 'next/link'

interface Page {
  id: string
  title: string
  body: string
}

async function getPages(): Promise<Page[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  try {
    const res = await fetch(`${baseUrl}/api/pages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      console.error('Failed to fetch pages:', res.status)
      return []
    }

    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
}

export default async function Home() {
  const pages = await getPages()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Payload CMS + Next.js 15 + Supabase
          </h1>
          <p className="text-xl text-slate-300 mb-6">
            A modern boilerplate for building content-driven applications
          </p>
          <Link
            href="/admin"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            📊 Open Admin Panel
          </Link>
        </header>

        {/* Pages Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-8">Pages</h2>

          {pages.length === 0 ? (
            <div className="bg-slate-700 p-8 rounded-lg border border-slate-600">
              <p className="text-slate-300">
                No pages yet. Go to{' '}
                <Link href="/admin" className="text-blue-400 hover:text-blue-300 underline">
                  the admin panel
                </Link>
                {' '}to create your first page.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {pages.map((page) => (
                <article
                  key={page.id}
                  className="bg-slate-700 p-6 rounded-lg border border-slate-600 hover:border-blue-500 transition"
                >
                  <h3 className="text-2xl font-bold text-white mb-3">{page.title}</h3>
                  <p className="text-slate-300 line-clamp-3">{page.body}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-700 text-center text-slate-400">
          <p>Built with Payload CMS, Next.js 15, and Supabase Postgres</p>
        </footer>
      </div>
    </main>
  )
}
