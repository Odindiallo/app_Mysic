'use client';

import { useEffect } from 'react';
import { useSongsStore } from '@/store/songs';

export default function SongsPage() {
  const { songs, isLoading, error, fetchSongs, updatePaymentStatus } = useSongsStore();

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  if (isLoading) {
    return (
      <div className="p-8">
        <p>Loading songs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Song Requests</h1>
      
      <div className="grid gap-4">
        {songs.map((song) => (
          <div
            key={song.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{song.recipient}&apos;s {song.occasion} Song</h2>
                <p className="text-gray-600 mt-1">{song.message}</p>
              </div>
              
              <div className="flex flex-col items-end">
                <span className={`
                  px-2 py-1 rounded text-sm
                  ${song.payment_status === 'completed' ? 'bg-green-100 text-green-800' :
                    song.payment_status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'}
                `}>
                  {song.payment_status}
                </span>
                
                {song.payment_status === 'pending' && (
                  <button
                    onClick={() => updatePaymentStatus(song.id, 'completed')}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {song.styles.map((style) => (
                <span
                  key={style}
                  className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {style}
                </span>
              ))}
              {song.tempos.map((tempo) => (
                <span
                  key={tempo}
                  className="px-2 py-1 bg-blue-100 rounded-full text-sm"
                >
                  {tempo}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
