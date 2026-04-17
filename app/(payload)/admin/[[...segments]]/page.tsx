import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function AdminPage() {
  const payload = await getPayload({ config })
  
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Admin Panel</h1>
        <p className="text-slate-300">
          Payload admin is loading... The admin UI is handled by Payload v3.
        </p>
      </div>
    </div>
  )
}
