<template>
  <header class="fixed top-0 right-0 left-0 lg:left-64 z-10 bg-cyber-darker/80 backdrop-blur-md border-b border-cyber-primary/20">
    <div class="px-8 py-6 flex items-center justify-between">
      <h1 class="text-xl font-semibold text-white capitalize">
        {{ formatRouteName }}
      </h1>
      <ClientOnly>
        <div class="flex items-center space-x-6">
          <ColorModeToggle />
          <div class="flex items-center space-x-4">
            <template v-if="user">
              <span class="text-sm text-gray-400">{{ user.email }}</span>
              <button
                @click="handleLogout"
                class="px-4 py-2 text-sm rounded-lg border border-cyber-primary/20 text-cyber-primary hover:bg-cyber-primary/10"
              >
                Logout
              </button>
            </template>
            <template v-else>
              <NuxtLink
                to="/auth/login"
                class="px-4 py-2 text-sm rounded-lg border border-cyber-primary/20 text-cyber-primary hover:bg-cyber-primary/10"
              >
                Admin Login
              </NuxtLink>
            </template>
          </div>
        </div>
      </ClientOnly>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const client = useSupabaseClient()
const user = useSupabaseUser()

const formatRouteName = computed(() => {
  return route.name?.toString().replace(/-/g, ' ') || ''
})

const handleLogout = async () => {
  await client.auth.signOut()
  router.push('/')
}
</script>