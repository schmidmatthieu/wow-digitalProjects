<template>
  <header class="fixed top-0 right-0 left-0 lg:left-64 z-10 bg-cyber-darker/80 backdrop-blur-md border-b border-cyber-primary/20">
    <div class="px-8 py-6">
      <h1 class="text-xl font-semibold text-white capitalize">
        {{ formatRouteName }}
      </h1>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

const formatRouteName = computed(() => {
  return route.name?.toString().replace(/-/g, ' ') || ''
})
</script>