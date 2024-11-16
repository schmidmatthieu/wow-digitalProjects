export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.vueApp.component('ClientOnly', {
      render(createElement: any) {
        if (process.client) {
          return this.$slots.default?.()?.[0]
        }
        return createElement('div', { style: 'display: none;' })
      }
    })
  }
})