<template>
  <div class="bg-gray-200/80 dark:bg-cyber-darker/80 backdrop-blur-md rounded-lg border dark:border-cyber-primary/20 border-cyber-secondary/20 p-6">
    <div class="space-y-6">
      <!-- Search with Suggestions -->
      <div class="relative">
        <ProjectSearch
          v-model="searchQuery"
          @focus="showSuggestions = $event"
        />
        
        <ProjectSearchSuggestions
          :show="showSuggestions"
          :suggestions="filteredSuggestions"
          @select="applySuggestion"
        />
      </div>

      <div class="flex gap-6 justify-between">
        <!-- Status Filters -->
        <ProjectStatusFilters
          v-model="localFilters.status"
        />

        <!-- Sort Options -->
        <ProjectSort
          v-model="localFilters.sort"
        />
      </div>

      <!-- Active Filters -->
      <ProjectActiveFilters
        :filters="localFilters"
        @remove="removeFilter"
        @clear="clearFilters"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectFilters } from '~/types'
import ProjectSearch from './filters/ProjectSearch.vue'
import ProjectSearchSuggestions from './filters/ProjectSearchSuggestions.vue'
import ProjectStatusFilters from './filters/ProjectStatusFilters.vue'
import ProjectActiveFilters from './filters/ProjectActiveFilters.vue'
import ProjectSort from './filters/ProjectSort.vue'

const props = defineProps<{
  filters: ProjectFilters
  projects?: any[]
}>()

const emit = defineEmits<{
  'update:filters': [filters: ProjectFilters]
}>()

const localFilters = ref({
  ...props.filters,
  sort: {
    by: 'status',
    order: 'asc' as const
  }
})

const searchQuery = ref('')
const showSuggestions = ref(false)

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

const applySuggestion = (suggestion: any) => {
  searchQuery.value = suggestion.value
  localFilters.value.search = suggestion.value
  showSuggestions.value = false
}

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
    search: '',
    sort: {
      by: 'status',
      order: 'asc'
    }
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