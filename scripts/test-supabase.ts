import { testSupabaseConnection } from '../src/lib/supabase/test-connection.js';

async function main() {
  const isConnected = await testSupabaseConnection();
  if (!isConnected) {
    process.exit(1);
  }
}

main().catch(console.error);
