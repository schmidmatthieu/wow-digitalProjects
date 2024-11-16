<template>
  <button
    @click="toggleColorMode"
    class="p-2 rounded-lg hover:bg-cyber-primary/10 transition-colors"
    :title="colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <IconSun v-if="colorMode === 'dark'" class="w-5 h-5 text-cyber-primary" />
    <IconMoon v-else class="w-5 h-5 text-cyber-primary" />
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>