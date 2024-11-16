<template>
  <ClientOnly>
    <div 
      :class="[
        'group bg-cyber-darker/80 backdrop-blur-md rounded-lg border border-cyber-primary/10 overflow-hidden transition-all duration-200 hover:border-cyber-primary/30 hover-glow',
        viewMode === 'list' ? 'flex' : ''
      ]"
    >
      <div 
        :class="[
          'relative overflow-hidden',
          viewMode === 'list' ? 'w-64 flex-shrink-0' : 'aspect-w-16 aspect-h-9'
        ]"
      >
        <img
          :src="project.thumbnail"
          :alt="project.name"
          class="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
        />
        <div class="absolute top-3 right-3">
          <span
            class="status-badge inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md"
            :class="statusClasses[project.status]"
          >
            {{ formatStatus(project.status) }}
          </span>
        </div>
        <div v-if="user" class="absolute top-3 left-3">
          <NuxtLink
            :to="`/projects/${project.id}/edit`"
            class="inline-flex items-center px-2 py-1 rounded-md bg-cyber-primary/20 text-cyber-primary text-xs font-medium backdrop-blur-md border border-cyber-primary/30 hover:bg-cyber-primary/30 transition-colors"
          >
            <PencilIcon class="w-3 h-3 mr-1" />
            Edit
          </NuxtLink>
        </div>
      </div>
      <div 
        :class="[
          viewMode === 'list' ? 'flex-1 flex flex-col' : '',
          'p-6'
        ]"
      >
        <div :class="[viewMode === 'list' ? 'flex-1' : '']">
          <h3 class="text-xl font-medium text-white transition-colors duration-200 group-hover:text-cyber-primary">
            {{ project.name }}
          </h3>
          <p class="mt-2 text-sm text-gray-400">
            {{ project.description }}
          </p>
          <div class="mt-4">
            <div class="flex items-center text-sm text-gray-400">
              <BuildingOfficeIcon class="h-4 w-4 mr-2 text-cyber-primary/70" />
              {{ project.client }}
            </div>
          </div>

          <!-- Environment Links -->
          <div class="mt-6 space-y-4">
            <template v-if="project.environments?.development">
              <div class="space-y-2">
                <h4 class="text-sm font-medium text-neon-yellow/90">Development</h4>
                <div class="flex gap-2">
                  <a
                    v-if="project.environments.development.frontend_url"
                    :href="project.environments.development.frontend_url"
                    target="_blank"
                    class="px-3 py-1.5 text-sm rounded-md bg-cyber-darker border border-neon-yellow/10 text-neon-yellow/80 hover:bg-neon-yellow/5 hover:border-neon-yellow/30 transition-all duration-200"
                  >
                    Frontend
                  </a>
                  <a
                    v-if="project.environments.development.backend_url"
                    :href="project.environments.development.backend_url"
                    target="_blank"
                    class="px-3 py-1.5 text-sm rounded-md bg-cyber-darker border border-neon-yellow/10 text-neon-yellow/80 hover:bg-neon-yellow/5 hover:border-neon-yellow/30 transition-all duration-200"
                  >
                    Backoffice
                  </a>
                </div>
              </div>
            </template>

            <template v-if="project.environments?.staging">
              <div class="space-y-2">
                <h4 class="text-sm font-medium text-neon-blue/90">Pre-production</h4>
                <div class="flex gap-2">
                  <a
                    v-if="project.environments.staging.frontend_url"
                    :href="project.environments.staging.frontend_url"
                    target="_blank"
                    class="px-3 py-1.5 text-sm rounded-md bg-cyber-darker border border-neon-blue/10 text-neon-blue/80 hover:bg-neon-blue/5 hover:border-neon-blue/30 transition-all duration-200"
                  >
                    Frontend
                  </a>
                  <a
                    v-if="project.environments.staging.backend_url"
                    :href="project.environments.staging.backend_url"
                    target="_blank"
                    class="px-3 py-1.5 text-sm rounded-md bg-cyber-darker border border-neon-blue/10 text-neon-blue/80 hover:bg-neon-blue/5 hover:border-neon-blue/30 transition-all duration-200"
                  >
                    Backoffice
                  </a>
                </div>
              </div>
            </template>

            <template v-if="project.environments?.production">
              <div class="space-y-2">
                <h4 class="text-sm font-medium text-neon-pink/90">Production</h4>
                <div class="flex gap-2">
                  <a
                    v-if="project.environments.production.frontend_url"
                    :href="project.environments.production.frontend_url"
                    target="_blank"
                    class="px-3 py-1.5 text-sm rounded-md bg-cyber-darker border border-neon-pink/10 text-neon-pink/80 hover:bg-neon-pink/5 hover:border-neon-pink/30 transition-all duration-200"
                  >
                    Frontend
                  </a>
                  <a
                    v-if="project.environments.production.backend_url"
                    :href="project.environments.production.backend_url"
                    target="_blank"
                    class="px-3 py-1.5 text-sm rounded-md bg-cyber-darker border border-neon-pink/10 text-neon-pink/80 hover:bg-neon-pink/5 hover:border-neon-pink/30 transition-all duration-200"
                  >
                    Backoffice
                  </a>
                </div>
              </div>
            </template>

            <template v-if="project.environments?.figma">
              <div class="space-y-2">
                <h4 class="text-sm font-medium text-neon-purple/90">Design</h4>
                <div class="flex gap-2">
                  <a
                    :href="project.environments.figma.frontend_url"
                    target="_blank"
                    class="px-3 py-1.5 text-sm rounded-md bg-cyber-darker border border-neon-purple/10 text-neon-purple/80 hover:bg-neon-purple/5 hover:border-neon-purple/30 transition-all duration-200"
                  >
                    Figma Discovery
                  </a>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="tech in project.project_tech_stack"
            :key="tech.id"
            class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-cyber-primary/5 text-cyber-primary/90 border border-cyber-primary/10 transition-all duration-200 hover:bg-cyber-primary/10 hover:border-cyber-primary/20"
          >
            {{ tech.technology }}
          </span>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { BuildingOfficeIcon, PencilIcon } from '@heroicons/vue/24/outline'
import type { Project } from '~/types'

const props = defineProps<{
  project: Project
  viewMode: 'grid' | 'list'
}>()

const user = useSupabaseUser()

const statusClasses = {
  in_development: 'bg-neon-yellow/5 text-neon-yellow/90 border border-neon-yellow/20',
  in_maintenance: 'bg-neon-blue/5 text-neon-blue/90 border border-neon-blue/20',
  in_production: 'bg-neon-pink/5 text-neon-pink/90 border border-neon-pink/20',
  upcoming: 'bg-neon-purple/5 text-neon-purple/90 border border-neon-purple/20',
  archived: 'bg-gray-500/5 text-gray-400/90 border border-gray-500/20',
}

const formatStatus = (status: string) => {
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}
</script>