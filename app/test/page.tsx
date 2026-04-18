import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Test Page',
}

export default function TestPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>✓ Payload Template Test</h1>
      <p>If you see this, the server is working!</p>
      <p>
        Admin panel: <a href="/admin">Go to /admin</a>
      </p>
      <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
        If /admin shows an error, the issue is with Payload initialization at runtime.
      </p>
    </div>
  )
}
