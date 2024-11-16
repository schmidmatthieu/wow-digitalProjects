export default defineNuxtRouteMiddleware((to) => {
  // Skip password check for password page and auth pages
  if (to.path === '/password' || to.path.startsWith('/auth/')) {
    return
  }

  // Check for password access in client-side only
  if (process.client) {
    const hasAccess = localStorage.getItem('app-access') === 'granted'
    if (!hasAccess) {
      return navigateTo('/password')
    }
  }
})