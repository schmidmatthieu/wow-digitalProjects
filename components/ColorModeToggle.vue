<template>
  <button
    @click="toggleColorMode"
    class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    :title="colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <IconSun v-if="colorMode === 'dark'" class="w-5 h-5 text-gray-400" />
    <IconMoon v-else class="w-5 h-5 text-gray-600" />
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>