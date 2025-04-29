import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = 'https://zsvfvfczfcairhndsejf.supabase.co' // Ganti dengan URL Supabase kamu
const supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdmZ2ZmN6ZmNhaXJobmRzZWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NDM3OTIsImV4cCI6MjA2MTMxOTc5Mn0.TnTfwCmwBWfhi9_C-k99IlKoC97bSL-oeVEUhBWnC4I' // Ganti dengan API key kamu
export const supabase = createClient(supabaseUrl, supabaseKey)
