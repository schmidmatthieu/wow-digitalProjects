import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#app'

export const useSupabaseClient = () => {
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabase.url,
    config.public.supabase.key
  )
  return supabase
}