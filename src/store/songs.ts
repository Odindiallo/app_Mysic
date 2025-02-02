import { create } from 'zustand';
import type { Song, SongRequest } from '@/lib/services/song-service';

interface SongsState {
  // State
  songs: Song[];
  currentSong: Song | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchSongs: () => Promise<void>;
  fetchSongById: (id: string) => Promise<void>;
  createSong: (request: SongRequest) => Promise<void>;
  updatePaymentStatus: (id: string, status: 'pending' | 'completed' | 'failed') => Promise<void>;
  clearError: () => void;
}

export const useSongsStore = create<SongsState>((set, get) => ({
  // Initial state
  songs: [],
  currentSong: null,
  isLoading: false,
  error: null,

  // Actions
  fetchSongs: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch('/api/songs');
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error);
      }

      set({ songs: json.data });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to fetch songs' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSongById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch(`/api/songs/${id}`);
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error);
      }

      set({ currentSong: json.data });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to fetch song' });
    } finally {
      set({ isLoading: false });
    }
  },

  createSong: async (request: SongRequest) => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch('/api/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error);
      }

      // Add the new song to the list and set it as current
      set((state) => ({
        songs: [...state.songs, json.data],
        currentSong: json.data,
      }));
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to create song' });
    } finally {
      set({ isLoading: false });
    }
  },

  updatePaymentStatus: async (id: string, status: 'pending' | 'completed' | 'failed') => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch(`/api/songs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_status: status }),
      });
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error);
      }

      // Update the song in the list and current song if it's selected
      set((state) => ({
        songs: state.songs.map((song) =>
          song.id === id ? { ...song, payment_status: status } : song
        ),
        currentSong:
          state.currentSong?.id === id
            ? { ...state.currentSong, payment_status: status }
            : state.currentSong,
      }));
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to update payment status' });
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
