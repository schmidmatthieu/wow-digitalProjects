import type { Database } from '~/types/supabase'

type Team = Database['public']['Tables']['teams']['Row']
type TeamInsert = Database['public']['Tables']['teams']['Insert']
type TeamUpdate = Database['public']['Tables']['teams']['Update']

export const useTeams = () => {
  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()

  const fetchUserTeam = async () => {
    if (!user.value?.id) throw new Error('User not authenticated')

    // First, check if user is part of any team
    const { data: teamMember } = await client
      .from('team_members')
      .select('team_id')
      .eq('user_id', user.value.id)
      .single()

    if (teamMember) {
      return teamMember.team_id
    }

    // If not, create a default team for the user
    const { data: team } = await client
      .from('teams')
      .insert({
        name: `${user.value.email}'s Team`,
        created_by: user.value.id
      })
      .select()
      .single()

    // Add user as team owner
    await client
      .from('team_members')
      .insert({
        team_id: team.id,
        user_id: user.value.id,
        role: 'owner'
      })

    return team.id
  }

  return {
    fetchUserTeam
  }
}