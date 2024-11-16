<template>
  <header class="bg-cyber-darker/80 backdrop-blur-md border-b border-cyber-primary/20">
    <div class="px-8 py-6 flex items-center justify-between">
      <h1 class="text-xl font-semibold text-white capitalize">
        {{ formatRouteName }}
      </h1>
      <div class="flex items-center space-x-6">
        <ColorModeToggle />
        <UserMenu />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

const formatRouteName = computed(() => {
  return route.name?.toString().replace(/-/g, ' ') || ''
})
</script>