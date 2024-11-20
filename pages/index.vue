<template>
  <div>
    <div class="flex justify-between items-center mb-8 mt-16 lg:mt-0">
      <h1 class="text-3xl font-bold text-black dark:text-white">
        <span class="text-cyber-primary">Project</span>Hub
      </h1>
      <div class="flex items-center gap-4">
        <div class="flex items-center dark:bg-cyber-darker/80 backdrop-blur-md rounded-lg border dark:border-cyber-primary/20 border-cyber-secondary/20 p-1">
          <button
            @click="viewMode = 'grid'"
            :class="[
              'p-2 rounded transition-all duration-200 flex items-center justify-center w-10 h-10',
              viewMode === 'grid' 
                ? 'dark:bg-cyber-primary bg-cyber-secondary text-gray-300 dark:text-gray-600 shadow-neon' 
                : 'text-gray-600 dark:text-gray-400 dark:hover:text-cyber-primary hover:text-cyber-secondary'
            ]"
          >
            <vue-feather type="grid" class="w-5 h-5" />
          </button>
          <button
            @click="viewMode = 'list'"
            :class="[
              'p-2 rounded transition-all duration-200 flex items-center justify-center w-10 h-10',
              viewMode === 'list' 
                ? 'dark:bg-cyber-primary bg-cyber-secondary text-gray-300 dark:text-gray-600 shadow-neon' 
                : 'text-gray-600 dark:text-gray-400 dark:hover:text-cyber-primary hover:text-cyber-secondary'
            ]"
          >
            <vue-feather type="list" class="w-5 h-5" />
          </button>
        </div>
        <NuxtLink
          v-if="user && hasPasswordAccess"
          to="/projects/new"
          class="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg dark:bg-cyber-primary bg-cyber-secondary text-gray-300 dark:text-gray-600 dark:hover:bg-cyber-primary/90 hover:bg-cyber-secondary/90 transition-colors duration-200 shadow-neon"
        >
          <vue-feather type="plus" class="w-5 h-5 mr-2" />
          Nouveau Projet
        </NuxtLink>
      </div>
    </div>

    <div class="mb-8">
      <ProjectFilters
        v-model:filters="filters"
        :projects="projects"
      />
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 dark:border-cyber-primary border-cyber-secondary mx-auto"></div>
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-12">
      {{ error }}
    </div>

    <div
      v-else
      :class="[
        viewMode === 'grid' 
          ? 'grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto' 
          : 'flex flex-col gap-6'
      ]"
    >
      <ProjectCard
        v-for="project in sortedProjects"
        :key="project.id"
        :project="project"
        :view-mode="viewMode"
      />
    </div>

    <!-- Empty state -->
    <div 
      v-if="!loading && !error && sortedProjects.length === 0" 
      class="text-center py-12"
    >
      <vue-feather 
        type="inbox" 
        class="w-16 h-16 mx-auto mb-4 dark:text-gray-400 text-gray-800"
      />
      <h3 class="text-xl font-medium dark:text-gray-300 text-gray-600 mb-2">
        Pas de projet trouvé
      </h3>
      <p class="dark:text-gray-300 text-gray-600">
        {{ user ? 'Create your first project to get started!' : 'No projects match your current filters.' }}
      </p>
      <NuxtLink
        v-if="user && hasPasswordAccess"
        to="/projects/new"
        class="inline-flex items-center px-6 py-3 mt-6 text-sm font-medium rounded-lg bg-cyber-primary text-gray-300 dark:text-gray-600 dark:hover:bg-cyber-primary/90 hover:bg-cyber-secondary/90 transition-colors duration-200 shadow-neon"
      >
        <vue-feather type="plus" class="w-5 h-5 mr-2" />
        Créer un projet
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types'

definePageMeta({
  middleware: ['auth']
})

const user = useSupabaseUser()
const { fetchProjects } = useProjects()

const viewMode = ref<'grid' | 'list'>('grid')
const loading = ref(true)
const error = ref('')
const projects = ref<Project[]>([])
const hasPasswordAccess = ref(false)

const filters = ref<ProjectFilters>({
  status: [],
  search: '',
  sort: {
    by: 'status',
    order: 'asc'
  }
})

// Status priority for sorting
const STATUS_PRIORITY = {
  in_development: 0,
  in_maintenance: 1,
  in_production: 2,
  upcoming: 3,
  archived: 4
}

const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const searchQuery = filters.value.search.toLowerCase()
    
    // Search in project name, client, technologies, and environment URLs
    const matchesSearch = !searchQuery || 
      project.name.toLowerCase().includes(searchQuery) ||
      project.client?.toLowerCase().includes(searchQuery) ||
      project.project_tech_stack?.some(tech => 
        tech.technology.toLowerCase().includes(searchQuery)
      ) ||
      project.project_environments?.some(env => 
        env.frontend_url?.toLowerCase().includes(searchQuery) ||
        env.backend_url?.toLowerCase().includes(searchQuery)
      )

    const matchesStatus = !filters.value.status.length || 
      filters.value.status.includes(project.status)

    return matchesSearch && matchesStatus
  })
})

const sortedProjects = computed(() => {
  const sorted = [...filteredProjects.value]
  const { by, order } = filters.value.sort

  sorted.sort((a, b) => {
    let comparison = 0

    switch (by) {
      case 'status':
        comparison = STATUS_PRIORITY[a.status as keyof typeof STATUS_PRIORITY] - 
                    STATUS_PRIORITY[b.status as keyof typeof STATUS_PRIORITY]
        break
      case 'created_at':
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        break
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'client':
        comparison = (a.client || '').localeCompare(b.client || '')
        break
    }

    return order === 'asc' ? comparison : -comparison
  })

  return sorted
})

// Check if user has password access
onMounted(() => {
  hasPasswordAccess.value = localStorage.getItem('app-access') === 'granted'
})

onMounted(async () => {
  try {
    projects.value = await fetchProjects()
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>