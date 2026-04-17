# Payload CMS Template

A modern boilerplate combining **Next.js 15**, **Payload v3 CMS**, and **Supabase Postgres**.

## Stack

- **Next.js 15** - React framework with App Router
- **Payload v3** - Headless CMS fully integrated into Next.js
- **Supabase** - PostgreSQL database
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety across the stack

## Features

- ✅ Admin panel at `/admin` (Payload)
- ✅ REST API at `/api/pages`
- ✅ Server-side rendering (pages fetched server-side)
- ✅ Environment-based configuration
- ✅ Ready to deploy on Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account with PostgreSQL database

### Local Development

1. **Clone and install:**
   ```bash
   git clone https://github.com/Flame0510/payload-cms-template.git
   cd payload-cms-template
   npm install
   ```

2. **Set up environment:**
   Copy `.env.example` to `.env.local` and fill in your credentials:
   ```bash
   cp .env.example .env.local
   ```

   Required variables:
   - `DATABASE_URI` - PostgreSQL connection string from Supabase
   - `PAYLOAD_SECRET` - Secret for Payload admin
   - `NEXT_PUBLIC_SERVER_URL` - Your application URL

3. **Run development server:**
   ```bash
   npm run dev
   ```

   Visit:
   - Homepage: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin`

4. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

## Project Structure

```
/app
  /(payload)/
    /admin/[[...segments]]/    - Admin panel page
    /api/[...slug]/            - Payload API routes
  /page.tsx                    - Homepage with pages list
/payload.config.ts            - Payload configuration
/next.config.ts               - Next.js configuration
/.env.example                 - Environment variables template
```

## Payload Collections

### Users
- Default auth collection
- Required for admin access

### Pages
- `title` (text, required)
- `body` (textarea, required)

## Deployment

### Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   - `DATABASE_URI`
   - `PAYLOAD_SECRET`
   - `NEXT_PUBLIC_SERVER_URL` (your Vercel domain)
4. Deploy

## API Usage

### Get all pages
```bash
curl https://your-domain.com/api/pages
```

Response:
```json
{
  "docs": [
    {
      "id": "...",
      "title": "Page Title",
      "body": "Page content...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "totalDocs": 1,
  "limit": 10,
  "page": 1,
  "totalPages": 1
}
```

## Database

This template uses Supabase PostgreSQL. The database tables are automatically created by Payload on first run.

To manually migrate:
```bash
npm run payload migrate
```

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URI` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `PAYLOAD_SECRET` | Secret for admin panel | `your-secret-key` |
| `NEXT_PUBLIC_SERVER_URL` | Public app URL (exposed to client) | `http://localhost:3000` |

## License

MIT

## Support

For issues with Payload, see [Payload Documentation](https://payloadcms.com/docs)
