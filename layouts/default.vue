<template>
  <div class="min-h-screen bg-cyber-black text-white">
    <AppSidebar />
    <div class="lg:pl-64">
      <main class="p-8">
        <slot />
      </main>
    </div>
    <div class="noise"></div>
  </div>
</template>

<script setup lang="ts">
// Layout component
</script>