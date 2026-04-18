import { NextResponse } from 'next/server'

export async function GET() {
  console.log('[DEBUG] Vercel Env Check')
  console.log('DATABASE_URI available:', !!process.env.DATABASE_URI)
  console.log('PAYLOAD_SECRET available:', !!process.env.PAYLOAD_SECRET)
  console.log('NODE_ENV:', process.env.NODE_ENV)
  
  return NextResponse.json({
    database_uri_available: !!process.env.DATABASE_URI,
    payload_secret_available: !!process.env.PAYLOAD_SECRET,
    node_env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
}
