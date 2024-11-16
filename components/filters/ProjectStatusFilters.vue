<template>
  <div>
    <label class="block text-sm font-medium text-gray-300 mb-2">
      Statut
    </label>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="status in statusOptions"
        :key="status.value"
        @click="toggleStatus(status.value)"
        :class="[
          'inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
          modelValue.includes(status.value)
            ? 'bg-cyber-primary text-cyber-black shadow-neon'
            : 'bg-cyber-black/50 text-gray-300 border border-cyber-primary/20 hover:bg-cyber-primary/10'
        ]"
      >
        <vue-feather :type="status.icon" class="w-4 h-4 mr-2" />
        {{ status.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const statusOptions = [
  { label: 'In Development', value: 'in_development', icon: 'code' },
  { label: 'In Maintenance', value: 'in_maintenance', icon: 'tool' },
  { label: 'In Production', value: 'in_production', icon: 'check-circle' },
  { label: 'Upcoming', value: 'upcoming', icon: 'clock' },
  { label: 'Archived', value: 'archived', icon: 'archive' }
]

const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const toggleStatus = (status: string) => {
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(status)
  
  if (index === -1) {
    newValue.push(status)
  } else {
    newValue.splice(index, 1)
  }
  
  emit('update:modelValue', newValue)
}
</script>