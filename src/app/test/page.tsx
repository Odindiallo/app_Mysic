'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function TestPage() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        // First, test if we can connect and query the table
        const { count: rowCount, error: queryError } = await supabase
          .from('songs')
          .select('*', { count: 'exact' });

        if (queryError) {
          setError(queryError.message);
          setStatus('error');
          return;
        }

        setCount(rowCount ?? 0);
        setStatus('connected');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setStatus('error');
      }
    }

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      
      <div className="p-4 rounded-lg border">
        <p className="mb-2">
          Status:{' '}
          <span className={status === 'connected' ? 'text-green-500' : status === 'error' ? 'text-red-500' : 'text-yellow-500'}>
            {status}
          </span>
        </p>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-4 mb-2">
            <p className="text-red-700">Error: {error}</p>
          </div>
        )}
        {count !== null && (
          <p className="text-green-700">Number of songs in database: {count}</p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Connection Details</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Environment</h3>
            <pre className="bg-white p-3 rounded border overflow-auto">
              {`NEXT_PUBLIC_SUPABASE_URL=${process.env.NEXT_PUBLIC_SUPABASE_URL}\n`}
              Table: songs
            </pre>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Table Schema</h3>
            <pre className="bg-white p-3 rounded border overflow-auto">
              {`songs {
  id: UUID (Primary Key)
  plan: TEXT
  occasion: TEXT
  recipient: TEXT
  message: TEXT
  styles: TEXT[]
  custom_style: TEXT
  tempos: TEXT[]
  custom_tempo: TEXT
  additional_info: TEXT
  is_rush_delivery: BOOLEAN
  payment_status: TEXT
  created_at: TIMESTAMPTZ
  updated_at: TIMESTAMPTZ
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
