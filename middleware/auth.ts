export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()

  // Skip auth check for login and callback pages
  if (to.path === '/auth/login' || to.path === '/auth/confirm' || to.path === '/password') {
    // If user is already logged in, redirect to home
    if (user.value) {
      return navigateTo('/')
    }
    return
  }

  // If no user, try to refresh the session
  if (!user.value) {
    const { data: { session }, error } = await client.auth.getSession()
    if (error || !session) {
      return navigateTo('/auth/login')
    }
  }

  // Redirect to login if still not authenticated
  if (!user.value) {
    return navigateTo('/auth/login')
  }
})