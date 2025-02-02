export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      songs: {
        Row: {
          id: string
          plan: string
          occasion: string
          recipient: string
          message: string
          styles: string[]
          custom_style: string | null
          tempos: string[]
          custom_tempo: string | null
          additional_info: string | null
          is_rush_delivery: boolean
          payment_status: 'pending' | 'completed' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          plan: string
          occasion: string
          recipient: string
          message: string
          styles?: string[]
          custom_style?: string | null
          tempos?: string[]
          custom_tempo?: string | null
          additional_info?: string | null
          is_rush_delivery?: boolean
          payment_status?: 'pending' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          plan?: string
          occasion?: string
          recipient?: string
          message?: string
          styles?: string[]
          custom_style?: string | null
          tempos?: string[]
          custom_tempo?: string | null
          additional_info?: string | null
          is_rush_delivery?: boolean
          payment_status?: 'pending' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
      }
      song_requests: {
        Row: {
          id: string
          plan_type: string
          status: 'draft' | 'pending' | 'completed' | 'failed'
          plan_name: string
          price: number
          songs_included: number
          price_per_song: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          plan_type: string
          status?: 'draft' | 'pending' | 'completed' | 'failed'
          plan_name: string
          price: number
          songs_included: number
          price_per_song: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          plan_type?: string
          status?: 'draft' | 'pending' | 'completed' | 'failed'
          plan_name?: string
          price?: number
          songs_included?: number
          price_per_song?: number
          created_at?: string
          updated_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          email: string
          project_type: 'custom-song' | 'cover-song' | 'other'
          message: string
          status: 'new' | 'read' | 'replied'
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          email: string
          project_type: 'custom-song' | 'cover-song' | 'other'
          message: string
          status?: 'new' | 'read' | 'replied'
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          email?: string
          project_type?: 'custom-song' | 'cover-song' | 'other'
          message?: string
          status?: 'new' | 'read' | 'replied'
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
