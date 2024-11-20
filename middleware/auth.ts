// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  // Routes publiques qui ne nécessitent aucune vérification
  const publicRoutes = ['/password', '/auth/login', '/auth/confirm']
  if (publicRoutes.includes(to.path)) {
    return
  }

  // Vérification du mot de passe global
  if (process.client) {
    const hasAccess = localStorage.getItem('app-access') === 'granted'
    if (!hasAccess) {
      return navigateTo('/password')
    }
  }

  // Routes qui nécessitent une authentification Supabase
  const protectedRoutes = ['/projects/new', '/projects/edit']
  const requiresAuth = protectedRoutes.some(route => to.path.includes(route))

  if (requiresAuth) {
    const user = useSupabaseUser()
    if (!user.value) {
      const client = useSupabaseClient()
      const { data: { session }, error } = await client.auth.getSession()
      if (error || !session) {
        return navigateTo('/auth/login')
      }
    }
  }
})