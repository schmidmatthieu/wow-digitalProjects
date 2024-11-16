export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts'
  ],
  
  compatibilityDate: '2024-11-16',
  
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  },

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
    },
    display: 'swap'
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
    componentIslands: true
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['ClientOnly'].includes(tag)
    }
  },

  nitro: {
    preset: 'node',
    serveStatic: true
  },

  devtools: {
    enabled: false
  }
})