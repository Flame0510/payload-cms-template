import type { Metadata } from 'next'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

export default async function Page({ params, searchParams }: Args) {
  try {
    return await RootPage({ config, params, searchParams, importMap })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[PAYLOAD ADMIN ERROR]', msg)
    console.error('[PAYLOAD ADMIN STACK]', err instanceof Error ? err.stack : '')
    throw err
  }
}
