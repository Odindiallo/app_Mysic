'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSongStore } from '@/store/song-store';

export default function CreateSongLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
