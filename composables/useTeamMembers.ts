import type { Database } from '~/types/supabase'

type TeamMember = Database['public']['Tables']['team_members']['Row']
type TeamMemberInsert = Database['public']['Tables']['team_members']['Insert']
type TeamMemberUpdate = Database['public']['Tables']['team_members']['Update']

export const useTeamMembers = () => {
  const client = useSupabaseClient<Database>()

  const addMember = async (member: TeamMemberInsert) => {
    const { data, error } = await client
      .from('team_members')
      .insert(member)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const updateMemberRole = async (id: string, role: TeamMemberUpdate['role']) => {
    const { data, error } = await client
      .from('team_members')
      .update({ role })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const removeMember = async (id: string) => {
    const { error } = await client
      .from('team_members')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  const getCurrentUserTeams = async () => {
    const { data: teamMembers, error } = await client
      .from('team_members')
      .select(`
        role,
        team:teams (*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return teamMembers
  }

  return {
    addMember,
    updateMemberRole,
    removeMember,
    getCurrentUserTeams
  }
}