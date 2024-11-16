import type { Database } from '~/types/supabase'

type Project = Database['public']['Tables']['projects']['Row']
type ProjectInsert = Database['public']['Tables']['projects']['Insert']
type ProjectUpdate = Database['public']['Tables']['projects']['Update']

// Status priority order
const STATUS_PRIORITY = {
  in_development: 0,
  in_maintenance: 1,
  in_production: 2,
  upcoming: 3,
  archived: 4
}

export const useProjects = () => {
  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()

  const fetchProjects = async () => {
    const { data: projects, error } = await client
      .from('projects')
      .select(`
        *,
        project_environments (*),
        project_tech_stack (*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Sort projects by status priority and creation date
    return projects.sort((a, b) => {
      // First compare by status priority
      const statusDiff = STATUS_PRIORITY[a.status as keyof typeof STATUS_PRIORITY] - 
                        STATUS_PRIORITY[b.status as keyof typeof STATUS_PRIORITY]
      
      if (statusDiff !== 0) return statusDiff

      // If status is the same, sort by creation date (newest first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  }

  const getProject = async (id: string) => {
    const { data: project, error } = await client
      .from('projects')
      .select(`
        *,
        project_environments (*),
        project_tech_stack (*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return project
  }

  const createProject = async (project: Omit<ProjectInsert, 'created_by'>) => {
    if (!user.value?.id) throw new Error('User not authenticated')

    const { data, error } = await client
      .from('projects')
      .insert({
        ...project,
        created_by: user.value.id
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  const updateProject = async (id: string, updates: ProjectUpdate) => {
    const { data, error } = await client
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const deleteProject = async (id: string) => {
    const { error } = await client
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  return {
    fetchProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
  }
}