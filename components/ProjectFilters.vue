<template>
  <div class="bg-cyber-darker/80 backdrop-blur-md rounded-lg border border-cyber-primary/20 p-6">
    <div class="space-y-6">
      <div>
        <label for="search" class="block text-sm font-medium text-gray-300">
          Search Projects
        </label>
        <div class="mt-2">
          <input
            id="search"
            v-model="localFilters.search"
            type="text"
            class="block w-full px-4 py-3 rounded-lg bg-cyber-black/50 border border-cyber-primary/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-primary focus:border-transparent"
            placeholder="Search by project name or client..."
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Status
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="status in statusOptions"
            :key="status.value"
            @click="toggleStatus(status.value)"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              localFilters.status.includes(status.value)
                ? 'bg-cyber-primary text-cyber-black shadow-neon'
                : 'bg-cyber-black/50 text-gray-300 border border-cyber-primary/20 hover:bg-cyber-primary/10'
            ]"
          >
            {{ status.label }}
          </button>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Type
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="type in typeOptions"
            :key="type.value"
            @click="toggleType(type.value)"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              localFilters.type.includes(type.value)
                ? 'bg-cyber-primary text-cyber-black shadow-neon'
                : 'bg-cyber-black/50 text-gray-300 border border-cyber-primary/20 hover:bg-cyber-primary/10'
            ]"
          >
            {{ type.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ProjectFilters } from '~/types'

const props = defineProps<{
  filters: ProjectFilters
}>()

const emit = defineEmits<{
  'update:filters': [filters: ProjectFilters]
}>()

const localFilters = ref({ ...props.filters })

const statusOptions = [
  { label: 'In Development', value: 'in_development' },
  { label: 'In Maintenance', value: 'in_maintenance' },
  { label: 'In Production', value: 'in_production' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Archived', value: 'archived' },
]

const typeOptions = [
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Figma', value: 'figma' },
]

const toggleStatus = (status: string) => {
  const index = localFilters.value.status.indexOf(status)
  if (index === -1) {
    localFilters.value.status.push(status)
  } else {
    localFilters.value.status.splice(index, 1)
  }
}

const toggleType = (type: string) => {
  const index = localFilters.value.type.indexOf(type)
  if (index === -1) {
    localFilters.value.type.push(type)
  } else {
    localFilters.value.type.splice(index, 1)
  }
}

watch(localFilters, (newFilters) => {
  emit('update:filters', { ...newFilters })
}, { deep: true })
</script>