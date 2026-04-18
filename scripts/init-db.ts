/**
 * Initialize Payload database schema on Supabase
 * Run this manually or on first deploy via Vercel build hook
 */
import { Client } from 'pg'

const connectionString = process.env.DATABASE_URI || process.env.DIRECT_URL
if (!connectionString) {
  throw new Error('DATABASE_URI or DIRECT_URL environment variable is required')
}

const client = new Client({ connectionString })

async function initDB() {
  try {
    await client.connect()
    console.log('Connected to database')

    // Create users collection table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255),
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('Created users table')

    // Create pages collection table
    await client.query(`
      CREATE TABLE IF NOT EXISTS pages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        body TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('Created pages table')

    console.log('Database initialized successfully')
  } catch (err) {
    console.error('Database initialization error:', err)
    process.exit(1)
  } finally {
    await client.end()
  }
}

initDB()
