export const dynamic = 'force-dynamic'
export const revalidate = 0

import Link from 'next/link'

export default async function Home() {
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
      </div>
    </main>
  )
}
