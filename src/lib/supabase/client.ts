import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Lazy initialization - client is created only when needed
let supabaseClient: ReturnType<typeof createSupabaseClient> | null = null;

export const createClient = () => {
  // Return existing client if already initialized
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // During build time, environment variables might not be available
  // Return a placeholder that will be properly initialized at runtime
  if (!supabaseUrl || !supabaseKey) {
    // Only throw in browser/runtime, not during build
    if (typeof window !== 'undefined') {
      console.error('Missing Supabase environment variables');
    }
    // Return a minimal client that won't crash the build
    return createSupabaseClient(
      'https://placeholder.supabase.co',
      'placeholder-key',
      { auth: { persistSession: false } }
    );
  }

  // Initialize and cache the client
  supabaseClient = createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return supabaseClient;
};
