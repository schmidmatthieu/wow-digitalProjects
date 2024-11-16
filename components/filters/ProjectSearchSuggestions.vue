<template>
  <div
    v-if="show && suggestions.length > 0"
    class="absolute z-10 w-full mt-2 bg-cyber-darker border border-cyber-primary/20 rounded-lg shadow-lg overflow-hidden"
  >
    <ul class="py-2 max-h-60 overflow-auto">
      <li
        v-for="suggestion in suggestions"
        :key="suggestion.type + suggestion.value"
        @click="$emit('select', suggestion)"
        class="px-4 py-2 hover:bg-cyber-primary/10 cursor-pointer flex items-center space-x-2 text-sm"
      >
        <vue-feather
          :type="getSuggestionIcon(suggestion.type)"
          class="w-4 h-4 text-cyber-primary/70"
        />
        <span class="text-gray-300">{{ suggestion.value }}</span>
        <span class="text-xs text-gray-500">{{ suggestion.type }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Suggestion {
  type: string
  value: string
}

const props = defineProps<{
  show: boolean
  suggestions: Suggestion[]
}>()

defineEmits<{
  select: [suggestion: Suggestion]
}>()

const getSuggestionIcon = (type: string) => {
  switch (type) {
    case 'project':
      return 'folder'
    case 'client':
      return 'briefcase'
    case 'technology':
      return 'code'
    case 'environment':
      return 'globe'
    default:
      return 'hash'
  }
}
</script>