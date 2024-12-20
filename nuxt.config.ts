export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase'
  ],
  
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true
    }
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
    serveStatic: true,
    output: {
      dir: 'dist'
    }
  },

  devtools: {
    enabled: false
  }
})