<template>
  <div>
    <label for="search" class="block text-sm font-medium text-gray-600 dark:text-gray-300">
      Rechercher des projets
    </label>
    <div class="relative mt-2">
      <div class="relative">
        <vue-feather
          type="search"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-gray-300"
        />
        <input
          id="search"
          v-model="searchQuery"
          type="text"
          class="block w-full pl-11 pr-4 py-3 rounded-lg bg-gray-300 dark:bg-cyber-darker border text-gray-600 dark:text-gray-300 placeholder-gray-600 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyber-secondary dark:focus:ring-cyber-primary focus:border-transparent"
          placeholder="Recherche par nom de projet, client, tech..."
          @focus="onFocus"
          @blur="onBlur"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'focus': [value: boolean]
}>()

const searchQuery = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const onFocus = () => emit('focus', true)
const onBlur = () => setTimeout(() => emit('focus', false), 200)
</script>