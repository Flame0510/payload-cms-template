import { getPayload } from 'payload'
import config from '@/payload.config'

let payloadInstance: any = null

async function initPayload() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config })
  }
  return payloadInstance
}

export const GET = async (req: Request) => {
  try {
    const payload = await initPayload()
    const url = new URL(req.url)
    
    // Extract collection and query params
    const pathSegments = url.pathname.replace('/api/', '').split('/')
    const collection = pathSegments[0]
    
    if (collection === 'pages') {
      const pages = await payload.find({
        collection,
        limit: 10,
      })
      return Response.json(pages)
    }
    
    return Response.json({ error: 'Not found' }, { status: 404 })
  } catch (error) {
    console.error('API Error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const POST = async (req: Request) => {
  try {
    const payload = await initPayload()
    const url = new URL(req.url)
    const pathSegments = url.pathname.replace('/api/', '').split('/')
    const collection = pathSegments[0]
    
    const body = await req.json()
    
    if (collection === 'pages') {
      const doc = await payload.create({
        collection,
        data: body,
      })
      return Response.json(doc, { status: 201 })
    }
    
    return Response.json({ error: 'Not found' }, { status: 404 })
  } catch (error) {
    console.error('API Error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
