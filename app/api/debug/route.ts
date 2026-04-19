import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import pg from 'pg'

const { Pool } = pg

export async function GET() {
  // Test connessione diretta prima
  const directTest = await testDirectConnection()
  
  try {
    const payload = await getPayload({ config })
    const users = await payload.count({ collection: 'users' })
    return NextResponse.json({ 
      ok: true, 
      userCount: users.totalDocs,
      serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
      dbUri: process.env.DATABASE_URI?.substring(0, 60) + '...',
      directTest
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    const cause = (err as { cause?: unknown })?.cause
    const causeMsg = cause instanceof Error ? cause.message : String(cause || 'none')
    const causeCode = (cause as { code?: string })?.code || 'none'
    return NextResponse.json({ 
      ok: false, 
      error: msg, 
      cause: causeMsg,
      causeCode,
      dbUri: process.env.DATABASE_URI?.substring(0, 60) + '...',
      directTest
    }, { status: 500 })
  }
}

async function testDirectConnection() {
  const uri = process.env.DATABASE_URI
  if (!uri) return { ok: false, error: 'no DATABASE_URI' }
  
  const pool = new Pool({
    connectionString: uri,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 8000,
    max: 1,
  })
  
  try {
    const res = await pool.query('SELECT 1 as test, current_database() as db')
    await pool.end()
    return { ok: true, db: res.rows[0].db }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    const code = (e as { code?: string })?.code || 'none'
    try { await pool.end() } catch {}
    return { ok: false, error: msg, code }
  }
}
