<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="inline-flex items-center px-3 py-1.5 text-sm rounded-lg border border-cyber-primary/20 text-cyber-primary hover:bg-cyber-primary/10 transition-all duration-200"
    >
      <vue-feather type="globe" class="w-4 h-4 mr-2" />
      {{ currentLocale.name }}
      <vue-feather
        type="chevron-down"
        class="w-4 h-4 ml-2"
        :class="{ 'transform rotate-180': isOpen }"
      />
    </button>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-cyber-darker border border-cyber-primary/20 overflow-hidden"
      >
        <div class="py-1">
          <button
            v-for="locale in availableLocales"
            :key="locale.code"
            @click="switchLanguage(locale.code)"
            class="w-full text-left px-4 py-2 text-sm hover:bg-cyber-primary/10 transition-colors duration-200 flex items-center"
            :class="locale.code === currentLocale.code ? 'text-cyber-primary' : 'text-gray-300'"
          >
            <vue-feather
              v-if="locale.code === currentLocale.code"
              type="check"
              class="w-4 h-4 mr-2"
            />
            <span v-else class="w-4 h-4 mr-2"></span>
            {{ locale.name }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const isOpen = ref(false)

const availableLocales = computed(() => {
  return (locales.value as any[]).map(l => ({
    code: l.code,
    name: l.name
  }))
})

const currentLocale = computed(() => {
  return availableLocales.value.find(l => l.code === locale.value) || availableLocales.value[0]
})

const switchLanguage = (code: string) => {
  locale.value = code
  isOpen.value = false
}

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (isOpen.value) {
      const target = event.target as HTMLElement
      if (!target.closest('.language-selector')) {
        isOpen.value = false
      }
    }
  }

  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>