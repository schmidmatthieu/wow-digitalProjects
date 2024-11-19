<template>
  <div>
    <!-- Mobile Hamburger Button -->
    <button 
      @click="isOpen = !isOpen"
      :class="[
        'lg:hidden fixed z-[60] px-2 pt-2 rounded-lg transition-all duration-300',
        isOpen 
          ? 'top-4 left-[190px] dark:bg-cyber-darker border dark:border-cyber-primary/20 border-cyber-secondary/20' 
          : 'top-4 left-8 dark:bg-cyber-darker border dark:border-cyber-primary/20 border-cyber-secondary/20'
      ]"
    >
      <vue-feather 
        :type="isOpen ? 'x' : 'menu'" 
        :class="[
          'w-6 h-6',
          isOpen ? 'text-cyber-primary' : 'text-cyber-primary'
        ]"
      />
    </button>

    <!-- Backdrop -->
    <div 
      v-if="isOpen"
      class="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      @click="isOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed top-0 left-0 h-full w-64 bg-gray-200 dark:bg-cyber-darker backdrop-blur-md border-r dark:border-cyber-primary/20 border-cyber-secondary/20 z-50 transition-all duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <div class="p-8 pt-16 lg:pt-8">
        <NuxtLink to="/" class="text-2xl font-bold text-white hover:opacity-80 transition-opacity">
          <img class="invert dark:invert-0" src="https://projects.wow-digital.com/wp-content/uploads/2024/05/logo-wow-white.svg">
        </NuxtLink>
      </div>

      <nav class="px-4 space-y-2">
        <NuxtLink
          to="/"
          class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black dark:text-white transition-all duration-200 hover:bg-cyber-primary/10 hover:shadow-neon"
          @click="isOpen = false"
        >
          <vue-feather type="grid" class="w-5 h-5 mr-3 text-cyber-primary" />
          Projets
        </NuxtLink>
      </nav>

      <div class="absolute bottom-0 left-0 right-0 p-4 space-y-4">
        <div class="flex items-center justify-between px-4 py-2">
          <ColorModeToggle />
          <ClientOnly>
            <template v-if="user">
              <button
                @click="handleLogout"
                class="inline-flex items-center h-10 px-3 py-1.5 text-sm rounded-lg border dark:border-cyber-primary/20 border-cyber-secondary/20 text-cyber-primary hover:bg-cyber-primary/10 transition-all duration-200"
              >
                <vue-feather type="log-out" class="w-4 h-4 mr-2" />
                Logout
              </button>
            </template>
            <template v-else>
              <NuxtLink
                to="/auth/login"
                class="inline-flex items-center h-10 px-3 py-1.5 text-sm rounded-lg border dark:border-cyber-primary/20 border-cyber-secondary/20 text-cyber-primary hover:bg-cyber-primary/10 transition-all duration-200"
              >
                <vue-feather type="user" class="w-4 h-4 mr-2" />
                Login
              </NuxtLink>
            </template>
          </ClientOnly>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const client = useSupabaseClient()
const user = useSupabaseUser()
const colorMode = useColorMode()
const isOpen = ref(false)

const handleLogout = async () => {
  await client.auth.signOut()
  router.push('/')
}

// Close sidebar when route changes on mobile
watch(() => router.currentRoute.value.path, () => {
  isOpen.value = false
})
</script>