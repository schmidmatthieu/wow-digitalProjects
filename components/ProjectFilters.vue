<template>
  <div class="bg-cyber-darker/80 backdrop-blur-md rounded-lg border border-cyber-primary/20 p-6">
    <div class="space-y-6">
      <!-- Search with Suggestions -->
      <div>
        <label for="search" class="block text-sm font-medium text-gray-300">
          Search Projects
        </label>
        <div class="relative mt-2">
          <div class="relative">
            <vue-feather
              type="search"
              class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            />
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              class="block w-full pl-11 pr-4 py-3 rounded-lg bg-cyber-black/50 border border-cyber-primary/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-primary focus:border-transparent"
              placeholder="Search by project name, client, tech..."
              @focus="showSuggestions = true"
              @blur="setTimeout(() => { showSuggestions = false }, 200)"
            />
          </div>

          <!-- Search Suggestions -->
          <div
            v-if="showSuggestions && filteredSuggestions.length > 0"
            class="absolute z-10 w-full mt-2 bg-cyber-darker border border-cyber-primary/20 rounded-lg shadow-lg overflow-hidden"
          >
            <ul class="py-2 max-h-60 overflow-auto">
              <li
                v-for="suggestion in filteredSuggestions"
                :key="suggestion.type + suggestion.value"
                @click="applySuggestion(suggestion)"
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
        </div>
      </div>

      <!-- Status Filters -->
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
              'inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              localFilters.status.includes(status.value)
                ? 'bg-cyber-primary text-cyber-black shadow-neon'
                : 'bg-cyber-black/50 text-gray-300 border border-cyber-primary/20 hover:bg-cyber-primary/10'
            ]"
          >
            <vue-feather :type="status.icon" class="w-4 h-4 mr-2" />
            {{ status.label }}
          </button>
        </div>
      </div>

      <!-- Active Filters -->
      <div v-if="hasActiveFilters" class="border-t border-cyber-primary/10 pt-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-400">Active Filters</span>
          <button
            @click="clearFilters"
            class="text-sm text-cyber-primary hover:text-cyber-primary/80 flex items-center"
          >
            <vue-feather type="x" class="w-3 h-3 mr-1" />
            Clear all
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="filter in activeFilters"
            :key="filter.id"
            class="inline-flex items-center px-2 py-1 rounded-md text-xs bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/20"
          >
            <vue-feather :type="filter.icon" class="w-3 h-3 mr-1" />
            {{ filter.label }}
            <button
              @click="removeFilter(filter)"
              class="ml-1 hover:text-cyber-primary/70"
            >
              <vue-feather type="x" class="w-3 h-3" />
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { ProjectFilters } from '~/types'

const props = defineProps<{
  filters: ProjectFilters
  projects?: any[]
}>()

const emit = defineEmits<{
  'update:filters': [filters: ProjectFilters]
}>()

const localFilters = ref({ ...props.filters })
const searchQuery = ref('')
const showSuggestions = ref(false)

const statusOptions = [
  { label: 'In Development', value: 'in_development', icon: 'code' },
  { label: 'In Maintenance', value: 'in_maintenance', icon: 'tool' },
  { label: 'In Production', value: 'in_production', icon: 'check-circle' },
  { label: 'Upcoming', value: 'upcoming', icon: 'clock' },
  { label: 'Archived', value: 'archived', icon: 'archive' }
]

// Generate suggestions from projects data
const suggestions = computed(() => {
  if (!props.projects) return []
  
  const allSuggestions = new Set()
  
  props.projects.forEach(project => {
    // Project names
    allSuggestions.add({ type: 'project', value: project.name })
    
    // Clients
    if (project.client) {
      allSuggestions.add({ type: 'client', value: project.client })
    }
    
    // Technologies
    project.project_tech_stack?.forEach((tech: any) => {
      allSuggestions.add({ type: 'technology', value: tech.technology })
    })
    
    // Environment URLs
    project.project_environments?.forEach((env: any) => {
      if (env.frontend_url) {
        allSuggestions.add({ type: 'environment', value: `${env.env_type} frontend` })
      }
      if (env.backend_url) {
        allSuggestions.add({ type: 'environment', value: `${env.env_type} backend` })
      }
    })
  })
  
  return Array.from(allSuggestions)
})

const filteredSuggestions = computed(() => {
  if (!searchQuery.value) return []
  
  const query = searchQuery.value.toLowerCase()
  return suggestions.value
    .filter((suggestion: any) => 
      suggestion.value.toLowerCase().includes(query)
    )
    .slice(0, 5) // Limit to 5 suggestions
})

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

const applySuggestion = (suggestion: any) => {
  searchQuery.value = suggestion.value
  localFilters.value.search = suggestion.value
  showSuggestions.value = false
}

const toggleStatus = (status: string) => {
  const index = localFilters.value.status.indexOf(status)
  if (index === -1) {
    localFilters.value.status.push(status)
  } else {
    localFilters.value.status.splice(index, 1)
  }
}

const hasActiveFilters = computed(() => {
  return localFilters.value.search || localFilters.value.status.length > 0
})

const activeFilters = computed(() => {
  const filters = []
  
  if (localFilters.value.search) {
    filters.push({
      id: 'search',
      label: `Search: ${localFilters.value.search}`,
      icon: 'search',
      type: 'search'
    })
  }
  
  localFilters.value.status.forEach(status => {
    const statusOption = statusOptions.find(opt => opt.value === status)
    if (statusOption) {
      filters.push({
        id: `status-${status}`,
        label: statusOption.label,
        icon: statusOption.icon,
        type: 'status',
        value: status
      })
    }
  })
  
  return filters
})

const removeFilter = (filter: any) => {
  if (filter.type === 'search') {
    localFilters.value.search = ''
    searchQuery.value = ''
  } else if (filter.type === 'status') {
    const index = localFilters.value.status.indexOf(filter.value)
    if (index !== -1) {
      localFilters.value.status.splice(index, 1)
    }
  }
}

const clearFilters = () => {
  localFilters.value = {
    status: [],
    search: ''
  }
  searchQuery.value = ''
}

watch(searchQuery, (newValue) => {
  localFilters.value.search = newValue
})

watch(localFilters, (newFilters) => {
  emit('update:filters', { ...newFilters })
}, { deep: true })
</script>