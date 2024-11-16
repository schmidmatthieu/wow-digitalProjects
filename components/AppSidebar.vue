<template>
  <aside class="fixed top-0 left-0 h-full w-64 bg-cyber-darker/80 backdrop-blur-md border-r border-cyber-primary/20">
    <div class="p-8">
      <NuxtLink to="/" class="text-2xl font-bold text-white hover:opacity-80 transition-opacity">
        <span class="text-cyber-primary">Project</span>Hub
      </NuxtLink>
    </div>
    <nav class="px-4">
      <NuxtLink
        to="/"
        class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-white hover:bg-cyber-primary/10 hover:shadow-neon"
      >
        <FolderIcon class="mr-3 h-5 w-5 text-cyber-primary" />
        Projects
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { FolderIcon } from '@heroicons/vue/24/outline'
</script>