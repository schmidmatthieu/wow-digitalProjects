import type { Database } from '~/types/supabase'

type ProjectEnvironment = Database['public']['Tables']['project_environments']['Row']
type ProjectEnvironmentInsert = Database['public']['Tables']['project_environments']['Insert']
type ProjectEnvironmentUpdate = Database['public']['Tables']['project_environments']['Update']

export const useProjectEnvironments = () => {
  const client = useSupabaseClient<Database>()

  const createEnvironment = async (environment: ProjectEnvironmentInsert) => {
    const { data, error } = await client
      .from('project_environments')
      .insert(environment)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const updateEnvironment = async (id: string, updates: ProjectEnvironmentUpdate) => {
    const { data, error } = await client
      .from('project_environments')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const deleteEnvironment = async (id: string) => {
    const { error } = await client
      .from('project_environments')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  return {
    createEnvironment,
    updateEnvironment,
    deleteEnvironment
  }
}