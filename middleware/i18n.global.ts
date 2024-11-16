export default defineNuxtRouteMiddleware((to, from) => {
  const { defaultLocale } = useI18n()
  const head = useHead()

  // Update HTML lang attribute
  head.htmlAttrs = { lang: to.params.lang || defaultLocale }
})