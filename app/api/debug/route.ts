import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const users = await payload.count({ collection: 'users' })
    return NextResponse.json({ 
      ok: true, 
      userCount: users.totalDocs,
      serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
      dbUri: process.env.DATABASE_URI?.substring(0, 50) + '...'
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? err.stack : ''
    return NextResponse.json({ ok: false, error: msg, stack }, { status: 500 })
  }
}
