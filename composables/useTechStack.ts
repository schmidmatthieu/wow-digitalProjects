import type { Database } from '~/types/supabase'

type TechStack = Database['public']['Tables']['project_tech_stack']['Row']
type TechStackInsert = Database['public']['Tables']['project_tech_stack']['Insert']

export const useTechStack = () => {
  const client = useSupabaseClient<Database>()

  const addTechnology = async (technology: TechStackInsert) => {
    const { data, error } = await client
      .from('project_tech_stack')
      .insert(technology)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const removeTechnology = async (id: string) => {
    const { error } = await client
      .from('project_tech_stack')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  const updateProjectTechStack = async (projectId: string, technologies: string[]) => {
    // First, remove all existing technologies for this project
    const { error: deleteError } = await client
      .from('project_tech_stack')
      .delete()
      .eq('project_id', projectId)

    if (deleteError) throw deleteError

    // Then, add the new technologies
    const { data, error: insertError } = await client
      .from('project_tech_stack')
      .insert(
        technologies.map(tech => ({
          project_id: projectId,
          technology: tech
        }))
      )
      .select()

    if (insertError) throw insertError
    return data
  }

  return {
    addTechnology,
    removeTechnology,
    updateProjectTechStack
  }
}