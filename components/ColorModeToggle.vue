<template>
  <button
    @click="toggleColorMode"
    class="relative w-10 h-10 rounded-lg transition-all duration-300 flex items-center justify-center hover:bg-cyber-primary/10"
    :title="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Transition
      name="theme-toggle"
      mode="out-in"
    >
      <component 
        :is="colorMode.value === 'dark' ? Sun : Moon"
        class="w-5 h-5"
        :class="colorMode.value === 'dark' ? 'text-cyber-primary' : 'text-[#008F83]'"
      />
    </Transition>
  </button>
</template>

<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'

const colorMode = useColorMode()
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<style scoped>
.theme-toggle-enter-active,
.theme-toggle-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.theme-toggle-enter-from,
.theme-toggle-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}
</style>