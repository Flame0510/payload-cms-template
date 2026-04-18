import Link from 'next/link'
import { getPayload } from 'payload'
import config from '../payload.config'

interface Page {
  id: string
  title: string
  body: string
}

async function getPages(): Promise<Page[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'pages' })
    return result.docs as Page[]
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
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Payload CMS + Next.js 15 + Supabase
          </h1>
          <p className="text-xl text-slate-300 mb-6">
            Boilerplate per applicazioni content-driven
          </p>
          <Link
            href="/admin"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            📊 Apri Admin Panel
          </Link>
        </header>

        <section className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-8">Pagine</h2>

          {pages.length === 0 ? (
            <div className="bg-slate-700 p-8 rounded-lg border border-slate-600">
              <p className="text-slate-300">
                Nessuna pagina ancora. Vai al{' '}
                <Link href="/admin" className="text-blue-400 hover:text-blue-300 underline">
                  pannello admin
                </Link>
                {' '}per creare la prima pagina.
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
                  <p className="text-slate-300">{page.body}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-16 pt-8 border-t border-slate-700 text-center text-slate-400">
          <p>Built with Payload CMS, Next.js 15 e Supabase Postgres</p>
        </footer>
      </div>
    </main>
  )
}
