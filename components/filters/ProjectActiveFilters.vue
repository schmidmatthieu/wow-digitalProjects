<template>
  <div v-if="hasActiveFilters" class="border-t border-cyber-secondary/10 dark:border-cyber-primary/10 pt-4">
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm text-gray-400">Filtres actif</span>
      <button
        @click="$emit('clear')"
        class="text-sm text-cyber-primary dark:hover:text-cyber-primary/80 hover:text-cyber-secondary/80 flex items-center"
      >
        <vue-feather type="x" class="w-3 h-3 mr-1" />
        Tout effacer
      </button>
    </div>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="filter in activeFilters"
        :key="filter.id"
        class="inline-flex items-center px-2 py-1 rounded-md text-xs dark:bg-cyber-primary/10 bg-cyber-secondary/10 text-cyber-primary border dark:border-cyber-primary/20 border-cyber-secondary/20"
      >
        <vue-feather :type="filter.icon" class="w-3 h-3 mr-1" />
        {{ filter.label }}
        <button
          @click="$emit('remove', filter)"
          class="ml-1 hover:text-cyber-secondary/70 dark:hover:text-cyber-primary/70 flex items-center"
        >
          <vue-feather type="x" class="w-3 h-3" />
        </button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Filter {
  id: string
  type: string
  value: string
  label: string
  icon: string
}

const props = defineProps<{
  filters: {
    search: string
    status: string[]
  }
}>()

defineEmits<{
  remove: [filter: Filter]
  clear: []
}>()

const hasActiveFilters = computed(() => {
  return props.filters.search || props.filters.status.length > 0
})

const activeFilters = computed(() => {
  const filters: Filter[] = []
  
  if (props.filters.search) {
    filters.push({
      id: 'search',
      type: 'search',
      value: props.filters.search,
      label: `Search: ${props.filters.search}`,
      icon: 'search'
    })
  }
  
  props.filters.status.forEach(status => {
    const statusOption = {
      in_development: { label: 'En Developpement', icon: 'code' },
      in_maintenance: { label: 'En Maintenance', icon: 'tool' },
      in_production: { label: 'En Production', icon: 'check-circle' },
      upcoming: { label: 'À venir', icon: 'clock' },
      archived: { label: 'Archivé', icon: 'archive' }
    }[status]
    
    if (statusOption) {
      filters.push({
        id: `status-${status}`,
        type: 'status',
        value: status,
        label: statusOption.label,
        icon: statusOption.icon
      })
    }
  })
  
  return filters
})
</script>