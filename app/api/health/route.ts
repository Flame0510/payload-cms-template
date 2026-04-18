import { NextResponse } from 'next/server'

export async function GET() {
  const dbUri = process.env.DATABASE_URI
  const secret = process.env.PAYLOAD_SECRET
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

  return NextResponse.json({
    status: 'ok',
    env: {
      DATABASE_URI: dbUri ? '✓ set' : '✗ missing',
      PAYLOAD_SECRET: secret ? '✓ set' : '✗ missing',
      NEXT_PUBLIC_SERVER_URL: serverUrl,
    },
    timestamp: new Date().toISOString(),
  })
}
