# Supabase Setup for Muisique

## Overview
This document outlines the Supabase setup for the Muisique application. We use Supabase for storing song requests and managing the request lifecycle.

## Setup Steps

1. Create a new Supabase project at https://app.supabase.com

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

3. Run the migrations:
   - Go to the SQL editor in your Supabase dashboard
   - Copy and paste the contents of `supabase/migrations/20250201_create_songs_table.sql`
   - Execute the SQL

## Database Schema

### Songs Table
- `id`: UUID (Primary Key)
- `plan`: Text (Required)
- `occasion`: Text (Required)
- `recipient`: Text (Required)
- `message`: Text (Required)
- `styles`: Text[] (Array of selected styles)
- `custom_style`: Text (Optional)
- `tempos`: Text[] (Array of selected tempos)
- `custom_tempo`: Text (Optional)
- `additional_info`: Text (Optional)
- `is_rush_delivery`: Boolean
- `payment_status`: Text (enum: pending, completed, failed)
- `created_at`: Timestamp with timezone
- `updated_at`: Timestamp with timezone

## Security

- Row Level Security (RLS) is enabled
- No authentication required (public access)
- Data validation through database constraints

## Integration Points

1. Form Submission:
   - Uses `songService.createSongRequest()`
   - Stores initial request with 'pending' payment status

2. Payment Processing:
   - Updates payment status using `songService.updatePaymentStatus()`
   - Supports status transitions: pending → completed/failed

## Error Handling

All database operations include proper error handling and user feedback through toast notifications.

## Development Guidelines

1. Always use the `songService` for database operations
2. Handle errors appropriately and show user-friendly messages
3. Validate data before sending to Supabase
4. Use TypeScript types for type safety
