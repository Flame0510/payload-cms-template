import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Use Postgres if DATABASE_URI is available, otherwise fall back to SQLite
const dbAdapter = process.env.DATABASE_URI
  ? postgresAdapter({
      pool: { connectionString: process.env.DATABASE_URI },
      push: false,
      migrationDir: 'migrations',
      disableCreateDatabase: true,
    })
  : sqliteAdapter({
      client: {
        url: 'file:./database.sqlite',
      },
    })

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
    {
      slug: 'pages',
      admin: { useAsTitle: 'title' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET!,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: dbAdapter,
})
