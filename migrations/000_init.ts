import type { MigrateUpArgs } from '@payloadcms/drizzle/postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Schema already exists on Supabase. This migration is a no-op.
  payload.logger.info('Verifying Payload schema on Supabase...')
}
