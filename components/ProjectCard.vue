<template>
  <ClientOnly>
    <div 
      :class="[
        'group bg-gray-200/80 dark:bg-cyber-darker/80 backdrop-blur-md rounded-lg border dark:border-cyber-primary/20 border-cyber-secondary/20 overflow-hidden transition-all duration-200 dark:hover:border-cyber-primary/50 hover:border-cyber-secondary/50 hover-glow flex',
        viewMode === 'list' ? 'flex-row h-fit' : 'flex-col h-fit'
      ]"
    >
      <div 
        :class="[
          'relative overflow-hidden',
          viewMode === 'list' ? 'w-[320px] h-full flex-shrink-0 min-h-36' : 'h-full min-h-36'
        ]"
      >
        <!-- Thumbnail -->
        <img
          :src="project.thumbnail || 'https://projects.wow-digital.com/wp-content/uploads/2024/05/logo-wow-white.svg'"
          :alt="project.name"
          class="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
        />
        
        <!-- Gradient overlay -->
        <div class="absolute inset-x-0 top-0 h-32 pointer-events-none">
          <div class="w-full h-full gradient-blur backdrop-blur-lg bg-black/40"></div>
        </div>
        
        <!-- Status badge -->
        <div class="absolute top-3 right-3 z-10">
          <span
            class="status-badge inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md shadow-lg"
            :class="statusClasses[project.status]"
          >
            {{ formatStatus(project.status) }}
          </span>
        </div>

        <!-- Edit button -->
        <div v-if="user" class="absolute top-3 left-3 z-10">
          <NuxtLink
            :to="`/projects/${project.id}/edit`"
            class="inline-flex items-center px-3 py-1.5 rounded-md dark:bg-cyber-primary/20 bg-cyber-secondary/20 text-white text-xs font-medium backdrop-blur-md border border-cyber-secondary/30 dark:border-cyber-primary/30 dark:hover:bg-cyber-primary/30 hover:bg-cyber-secondary/30 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <vue-feather type="edit-2" class="w-3 h-3 mr-1.5" />
            Editer
          </NuxtLink>
        </div>
      </div>

      <!-- Content -->
      <div 
        :class="[
          viewMode === 'list' ? 'flex-1 flex flex-col min-w-0 overflow-hidden' : '',
          'p-6 flex flex-col flex-1'
        ]"
      >
        <!-- Project Info -->
        <div class="flex-none">
          <h3 class="text-xl font-medium text-black dark:text-white transition-colors duration-200 truncate">
            {{ project.name }}
          </h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {{ project.description }}
          </p>
          <div class="mt-4">
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <vue-feather type="briefcase" class="w-4 h-4 mr-2 text-cyber-primary flex-shrink-0" />
              <span class="truncate">{{ project.client }}</span>
            </div>
          </div>
        </div>
        <!-- Environment Links -->
        <div 
          :class="[
            'mt-6 flex-1  custom-scrollbar',
            viewMode === 'list' ? 'grid grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-4'
          ]"
        >
          <template v-for="env in projectEnvironments" :key="env.type">
            <div 
              v-if="env.urls.length > 0" 
              :class="[
                'space-y-2',
                viewMode === 'list' ? 'min-w-[200px]' : ''
              ]"
            >
              <h4 class="text-sm font-medium text-gray-600 dark:text-gray-300" :class="envStyles[env.type].text">
                {{ env.label }}
              </h4>
              <div class="flex flex-wrap gap-2">
                <a
                  v-for="url in env.urls"
                  :key="url.type"
                  :href="url.link"
                  target="_blank"
                  :class="[
                    'inline-flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md transition-all duration-200 transform hover:scale-105 whitespace-nowrap text-gray-600 dark:text-gray-300',
                    envStyles[env.type].bg,
                    envStyles[env.type].text,
                    envStyles[env.type].hover
                  ]"
                >
                  <vue-feather :type="url.icon" class="w-4 h-4 mr-2" />
                  {{ url.label }}
                </a>
              </div>
            </div>
          </template>
        </div>
        <!-- Tech Stack -->
        <div v-if="project.project_tech_stack?.length" class="mt-6 pt-4 border-t border-cyber-primary/10 flex-none">
          <h4 class="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 flex items-center">
            <vue-feather type="code" class="w-4 h-4 mr-2 text-cyber-primary" />
            Technologie
          </h4>
          <div class="flex flex-wrap gap-2">         

            <span
              v-for="tech in project.project_tech_stack"
              :key="tech.id"
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-cyber-primary/5 text-cyber-primary border border-cyber-primary transition-all duration-200 hover:border-cyber-primary"
            >
              <vue-feather type="hash" class="w-3 h-3 mr-1" />
              {{ tech.technology }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.gradient-blur {
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
}
  
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 255, 240, 0.2) rgba(0, 255, 240, 0.05);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 255, 240, 0.05);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 240, 0.2);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 240, 0.3);
}
</style>

<script setup lang="ts">
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

const envStyles = {
  development: {
    text: 'text-neon-yellow/90',
    bg: 'bg-neon-yellow/5 border border-neon-yellow/20',
    hover: 'hover:bg-neon-yellow/10 hover:border-neon-yellow/30'
  },
  staging: {
    text: 'text-neon-blue/90',
    bg: 'bg-neon-blue/5 border border-neon-blue/20',
    hover: 'hover:bg-neon-blue/10 hover:border-neon-blue/30'
  },
  production: {
    text: 'text-neon-pink/90',
    bg: 'bg-neon-pink/5 border border-neon-pink/20',
    hover: 'hover:bg-neon-pink/10 hover:border-neon-pink/30'
  },
  figma: {
    text: 'text-neon-purple/90',
    bg: 'bg-neon-purple/5 border border-neon-purple/20',
    hover: 'hover:bg-neon-purple/10 hover:border-neon-purple/30'
  }
}

const projectEnvironments = computed(() => {
  const environments = props.project.project_environments || []
  
  return [
    {
      type: 'development',
      label: 'Development',
      urls: environments
        .filter(env => env.env_type === 'development')
        .map(env => [
          env.frontend_url && { type: 'frontend', link: env.frontend_url, label: 'Frontend', icon: 'layout' },
          env.backend_url && { type: 'backend', link: env.backend_url, label: 'Backoffice', icon: 'server' }
        ])
        .flat()
        .filter(Boolean)
    },
    {
      type: 'staging',
      label: 'Pre-production',
      urls: environments
        .filter(env => env.env_type === 'staging')
        .map(env => [
          env.frontend_url && { type: 'frontend', link: env.frontend_url, label: 'Frontend', icon: 'layout' },
          env.backend_url && { type: 'backend', link: env.backend_url, label: 'Backoffice', icon: 'server' }
        ])
        .flat()
        .filter(Boolean)
    },
    {
      type: 'production',
      label: 'Production',
      urls: environments
        .filter(env => env.env_type === 'production')
        .map(env => [
          env.frontend_url && { type: 'frontend', link: env.frontend_url, label: 'Frontend', icon: 'layout' },
          env.backend_url && { type: 'backend', link: env.backend_url, label: 'Backoffice', icon: 'server' }
        ])
        .flat()
        .filter(Boolean)
    },
    {
      type: 'figma',
      label: 'Design',
      urls: environments
        .filter(env => env.env_type === 'figma')
        .map(env => [
          env.frontend_url && { type: 'figma', link: env.frontend_url, label: 'Figma Discovery', icon: 'figma' }
        ])
        .flat()
        .filter(Boolean)
    }
  ]
})

const formatStatus = (status: string) => {
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}
</script>