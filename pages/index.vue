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

    <div
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
import { ref, computed } from 'vue'
import { PlusIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/vue/24/outline'
import type { Project, ProjectFilters as Filters } from '~/types'

const viewMode = ref<'grid' | 'list'>('grid')

const filters = ref<Filters>({
  status: [],
  type: [],
  search: '',
})

// Example projects with all environments
const projects = ref<Project[]>([
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Modern e-commerce solution with advanced features and seamless user experience',
    status: 'in_development',
    type: 'frontend',
    client: 'TechCorp',
    thumbnail: 'https://picsum.photos/seed/1/800/400',
    environments: {
      development: {
        frontend: 'https://dev.example.com',
        backend: 'https://admin.dev.example.com',
      },
      staging: {
        frontend: 'https://staging.example.com',
        backend: 'https://admin.staging.example.com',
      },
      production: {
        frontend: 'https://example.com',
        backend: 'https://admin.example.com',
      },
      figma: 'https://figma.com/file/example',
    },
    techStack: ['Vue.js', 'Node.js', 'PostgreSQL'],
  },
  {
    id: '2',
    name: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard with advanced data visualization',
    status: 'in_production',
    type: 'frontend',
    client: 'DataCorp',
    thumbnail: 'https://picsum.photos/seed/2/800/400',
    environments: {
      development: {
        frontend: 'https://dev.analytics.com',
        backend: 'https://api.dev.analytics.com',
      },
      production: {
        frontend: 'https://analytics.com',
        backend: 'https://api.analytics.com',
      },
      figma: 'https://figma.com/file/analytics',
    },
    techStack: ['React', 'GraphQL', 'MongoDB'],
  },
  {
    id: '3',
    name: 'HR Management System',
    description: 'Comprehensive HR management platform with employee tracking',
    status: 'upcoming',
    type: 'backend',
    client: 'HR Solutions',
    thumbnail: 'https://picsum.photos/seed/3/800/400',
    environments: {
      development: {
        frontend: 'https://dev.hrms.com',
        backend: 'https://api.dev.hrms.com',
      },
      figma: 'https://figma.com/file/hrms',
    },
    techStack: ['Angular', 'Java', 'Oracle'],
  },
])

const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const matchesSearch = !filters.value.search || 
      project.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      project.client.toLowerCase().includes(filters.value.search.toLowerCase())

    const matchesStatus = !filters.value.status.length || 
      filters.value.status.includes(project.status)

    const matchesType = !filters.value.type.length || 
      filters.value.type.includes(project.type)

    return matchesSearch && matchesStatus && matchesType
  })
})
</script>