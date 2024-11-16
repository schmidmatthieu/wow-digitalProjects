export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()

  // Skip auth check for login and callback pages
  if (to.path === '/auth/login' || to.path === '/auth/confirm' || to.path === '/password') {
    // If user is already logged in, redirect to home
    if (user.value) {
      return navigateTo('/')
    }
    return
  }

  // Redirect to login if not authenticated
  if (!user.value) {
    return navigateTo('/auth/login')
  }
})