<template>
  <aside class="fixed top-0 left-0 h-full w-64 bg-cyber-darker/80 backdrop-blur-md border-r border-cyber-primary/20">
    <div class="p-8">
      <NuxtLink to="/" class="text-2xl font-bold text-white hover:opacity-80 transition-opacity">
        <span class="text-cyber-primary">Project</span>Hub
      </NuxtLink>
    </div>

    <nav class="px-4 space-y-2">
      <NuxtLink
        to="/"
        class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-white hover:bg-cyber-primary/10 hover:shadow-neon"
      >
        <vue-feather type="grid" class="w-5 h-5 mr-3 text-cyber-primary" />
        {{ $t('projects') }}
      </NuxtLink>
    </nav>

    <div class="absolute bottom-0 left-0 right-0 p-4 space-y-4">
      <div class="flex items-center justify-between px-4 py-2">
        <div class="flex items-center gap-2">
          <ColorModeToggle />
          <LanguageSelector />
        </div>
        <ClientOnly>
          <template v-if="user">
            <button
              @click="handleLogout"
              class="inline-flex items-center px-3 py-1.5 text-sm rounded-lg border border-cyber-primary/20 text-cyber-primary hover:bg-cyber-primary/10 transition-all duration-200"
            >
              <vue-feather type="log-out" class="w-4 h-4 mr-2" />
              {{ $t('auth.logout') }}
            </button>
          </template>
          <template v-else>
            <NuxtLink
              to="/auth/login"
              class="inline-flex items-center px-3 py-1.5 text-sm rounded-lg border border-cyber-primary/20 text-cyber-primary hover:bg-cyber-primary/10 transition-all duration-200"
            >
              <vue-feather type="user" class="w-4 h-4 mr-2" />
              {{ $t('auth.login') }}
            </NuxtLink>
          </template>
        </ClientOnly>
      </div>
    </div>

  </aside>
</template>

<script setup lang="ts">
const router = useRouter()
const client = useSupabaseClient()
const user = useSupabaseUser()
const colorMode = useColorMode()

const handleLogout = async () => {
  await client.auth.signOut()
  router.push('/')
}
</script>