<template>
  <div>
    <label class="block text-sm font-medium dark:text-gray-300 text-gray-600 mb-2">
      <slot>Tech Stack</slot>
    </label>
    <div class="flex flex-wrap gap-2 items-center">
  <div class="relative flex-1">
    <input
      v-model="newTech"
      @keydown.enter.prevent="addTech"
      @keydown.down="navigateSuggestion(1)"
      @keydown.up="navigateSuggestion(-1)"
      type="text"
      placeholder="Add technology..."
      class="block w-full px-4 py-3 h-12 rounded-lg dark:bg-cyber-black/50 bg-gray-200 border dark:border-cyber-primary/20 border-cyber-secondary/20 text-gray-600 dark:text-gray-300 dark:placeholder-gray-400 placeholder-gray-600 focus:outline-none focus:ring-2 dark:focus:ring-cyber-primary focus:ring-cyber-secondary focus:border-transparent"
      @focus="showSuggestions = true"
      @blur="setTimeout(() => { showSuggestions = false }, 200)"
    />
    
    <!-- Suggestions Dropdown -->
    <div
      v-if="showSuggestions && filteredSuggestions.length > 0"
      class="absolute z-50 w-full mt-1 dark:bg-cyber-darker bg-cyber-lighter border dark:border-cyber-primary/20 border-cyber-secondary/20 rounded-lg shadow-lg overflow-hidden"
    >
      <ul class="py-1 max-h-48 overflow-auto">
        <li
          v-for="(suggestion, index) in filteredSuggestions"
          :key="suggestion"
          :class="[
            'px-4 py-2 cursor-pointer flex items-center space-x-2 text-sm',
            index === selectedIndex ? 'dark:bg-cyber-primary/10 bg-cyber-secondary/10' : 'dark:hover:bg-cyber-primary/5 hover:bg-cyber-secondary/5'
          ]"
          @click="selectSuggestion(suggestion)"
        >
          <vue-feather type="hash" class="w-4 h-4 dark:text-cyber-primary/70 text-cyber-secondary/70" />
          <span class="dark:text-gray-300 text-gray-600">{{ suggestion }}</span>
        </li>
      </ul>
    </div>
  </div>
  
  <button
    type="button"
    @click="addTech"
    class="inline-flex items-center h-12 px-4 rounded-lg dark:bg-cyber-primary/10 bg-cyber-secondary/10 dark:text-cyber-primary text-cyber-secondary border dark:border-cyber-primary/20 border-cyber-secondary/20 dark:hover:bg-cyber-primary/20 hover:bg-cyber-secondary/20"
  >
    <vue-feather type="plus" class="w-4 h-4 mr-2" />
    Ajouter
  </button>
</div>

    <!-- Selected Technologies -->
    <div class="mt-2 flex flex-wrap gap-2">
      <span
        v-for="tech in modelValue"
        :key="tech"
        class="inline-flex items-center px-3 py-1 rounded-full text-sm dark:bg-cyber-primary/10 bg-cyber-secondary/10 dark:text-cyber-primary text-cyber-secondary border dark:border-cyber-primary/20 border-cyber-secondary/20"
      >
        <vue-feather type="hash" class="w-3 h-3 mr-1.5" />
        {{ tech }}
        <button
          type="button"
          @click="removeTech(tech)"
          class="ml-2 dark:text-cyber-primary text-cyber-secondary dark:hover:text-cyber-primary/70 hover:text-cyber-secondary/70"
        >
          <vue-feather type="x" class="w-3 h-3" />
        </button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string[]
  suggestions?: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const newTech = ref('')
const showSuggestions = ref(false)
const selectedIndex = ref(-1)

const filteredSuggestions = computed(() => {
  if (!newTech.value) return []
  
  const input = newTech.value.toLowerCase()
  return (props.suggestions || [])
    .filter(tech => 
      tech.toLowerCase().includes(input) && 
      !props.modelValue.includes(tech)
    )
    .slice(0, 5)
})

const addTech = () => {
  if (selectedIndex.value !== -1 && filteredSuggestions.value[selectedIndex.value]) {
    selectSuggestion(filteredSuggestions.value[selectedIndex.value])
    return
  }

  if (newTech.value && !props.modelValue.includes(newTech.value)) {
    emit('update:modelValue', [...props.modelValue, newTech.value])
    newTech.value = ''
    selectedIndex.value = -1
  }
}

const removeTech = (tech: string) => {
  emit('update:modelValue', props.modelValue.filter(t => t !== tech))
}

const selectSuggestion = (tech: string) => {
  if (!props.modelValue.includes(tech)) {
    emit('update:modelValue', [...props.modelValue, tech])
  }
  newTech.value = ''
  selectedIndex.value = -1
  showSuggestions.value = false
}

const navigateSuggestion = (direction: number) => {
  if (!filteredSuggestions.value.length) return

  const newIndex = selectedIndex.value + direction
  if (newIndex >= -1 && newIndex < filteredSuggestions.value.length) {
    selectedIndex.value = newIndex
  }
}

// Reset selection when input changes
watch(newTech, () => {
  selectedIndex.value = -1
})
</script>