export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase',
    '@nuxtjs/i18n'
  ],
  
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      exclude: ['/*'],
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8, // 8 hours
      sameSite: 'lax',
      secure: true
    }
  },

  i18n: {
    baseUrl: 'http://localhost:3000',
    defaultLocale: 'fr',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    langDir: 'locales',
    locales: [
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Français',
        file: 'fr.json'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts'
  },
  
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
    dataValue: 'theme'
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
        lang: 'fr'
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