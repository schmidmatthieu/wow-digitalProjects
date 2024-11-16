<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">
        <span class="text-cyber-primary">Project</span>Hub
      </h1>
      <div class="flex items-center gap-4">
        <div class="flex items-center bg-cyber-darker/80 backdrop-blur-md rounded-lg border border-cyber-primary/20 p-1">
          <button
            @click="viewMode = 'grid'"
            :class="[
              'p-2 rounded transition-all duration-200',
              viewMode === 'grid' 
                ? 'bg-cyber-primary text-cyber-black shadow-neon' 
                : 'text-gray-400 hover:text-cyber-primary'
            ]"
          >
            <Squares2X2Icon class="w-5 h-5" />
          </button>
          <button
            @click="viewMode = 'list'"
            :class="[
              'p-2 rounded transition-all duration-200',
              viewMode === 'list' 
                ? 'bg-cyber-primary text-cyber-black shadow-neon' 
                : 'text-gray-400 hover:text-cyber-primary'
            ]"
          >
            <ListBulletIcon class="w-5 h-5" />
          </button>
        </div>
        <NuxtLink
          v-if="user"
          to="/projects/new"
          class="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg bg-cyber-primary text-cyber-black hover:bg-cyber-primary/90 transition-colors duration-200 shadow-neon"
        >
          <PlusIcon class="w-5 h-5 mr-2" />
          New Project
        </NuxtLink>
      </div>
    </div>

    <div class="mb-8">
      <ProjectFilters v-model:filters="filters" />
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-primary mx-auto"></div>
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-12">
      {{ error }}
    </div>

    <div
      v-else
      :class="[
        viewMode === 'grid' 
          ? 'grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' 
          : 'space-y-6'
      ]"
    >
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.id"
        :project="project"
        :view-mode="viewMode"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { PlusIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/vue/24/outline'
import type { Project, ProjectFilters as Filters } from '~/types'

definePageMeta({
  middleware: ['password']
})

const user = useSupabaseUser()
const { fetchProjects } = useProjects()

const viewMode = ref<'grid' | 'list'>('grid')
const loading = ref(true)
const error = ref('')
const projects = ref<Project[]>([])

const filters = ref<Filters>({
  status: [],
  type: [],
  search: '',
})

const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const matchesSearch = !filters.value.search || 
      project.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      project.client?.toLowerCase().includes(filters.value.search.toLowerCase())

    const matchesStatus = !filters.value.status.length || 
      filters.value.status.includes(project.status)

    const matchesType = !filters.value.type.length || 
      filters.value.type.includes(project.type)

    return matchesSearch && matchesStatus && matchesType
  })
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