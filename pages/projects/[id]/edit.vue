<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 dark:border-cyber-primary border-cyber-secondary mx-auto"></div>
    </div>

    <template v-else-if="project">
      <div class="dark:bg-cyber-darker/80 bg-cyber-lighter/80 backdrop-blur-md rounded-lg border dark:border-cyber-primary/20 border-cyber-secondary/20 p-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-2xl font-bold text-gray-600 dark:text-gray-300">Editer le projet</h1>
          <button
            @click="handleDelete"
            class="px-4 py-2 text-sm rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10"
            :disabled="deleting"
          >
            {{ deleting ? 'Deleting...' : 'Delete Project' }}
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Basic Information -->
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Nom du projet</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="appearance-none rounded-lg relative block w-full mt-2 px-4 py-3 dark:bg-cyber-black/50 bg-gray-200 border dark:border-cyber-primary/20 border-cyber-secondary/20 placeholder-gray-400 dark:text-white text-black focus:outline-none focus:ring-2 dark:focus:ring-cyber-primary focus:ring-cyber-secondary focus:border-transparent"
              />
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Description</label>
              <textarea
                id="description"
                v-model="form.description"
                rows="3"
                class="appearance-none rounded-lg relative block w-full mt-2 px-4 py-3 dark:bg-cyber-black/50 bg-gray-200 border dark:border-cyber-primary/20 border-cyber-secondary/20 placeholder-gray-400 dark:text-white text-black focus:outline-none focus:ring-2 dark:focus:ring-cyber-primary focus:ring-cyber-secondary focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label for="client" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Client</label>
              <input
                id="client"
                v-model="form.client"
                type="text"
                class="appearance-none rounded-lg relative block w-full mt-2 px-4 py-3 dark:bg-cyber-black/50 bg-gray-200 border dark:border-cyber-primary/20 border-cyber-secondary/20 placeholder-gray-400 dark:text-white text-black focus:outline-none focus:ring-2 dark:focus:ring-cyber-primary focus:ring-cyber-secondary focus:border-transparent"
              />
            </div>

            <div>
              <label for="status" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Statut</label>
              <select
                id="status"
                v-model="form.status"
                required
                class="appearance-none rounded-lg relative block w-full mt-2 px-4 py-3 dark:bg-cyber-black/50 bg-gray-200 border dark:border-cyber-primary/20 border-cyber-secondary/20 placeholder-gray-400 dark:text-white text-black focus:outline-none focus:ring-2 dark:focus:ring-cyber-primary focus:ring-cyber-secondary focus:border-transparent"
              >
                <option value="in_development">En Development</option>
                <option value="in_maintenance">En Maintenance</option>
                <option value="in_production">En Production</option>
                <option value="upcoming">A venir</option>
                <option value="archived">Archivé</option>
              </select>
            </div>
          </div>

          <!-- Tech Stack -->
          <TechStackInput
            v-model="techStack"
            :suggestions="availableTechnologies"
          />

          <!-- Environments -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-600 dark:text-gray-300">Environments</h3>

            <div v-for="env in environments" :key="env.type" class="space-y-2">
              <h4 class="text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">{{ env.label }}</h4>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label :for="'frontend-' + env.type" class="block text-xs text-gray-600 dark:text-gray-300">Frontend URL</label>
                  <input
                    :id="'frontend-' + env.type"
                    v-model="env.frontend"
                    type="url"
                    class="appearance-none rounded-lg relative block w-full mt-2 px-4 py-3 dark:bg-cyber-black/50 bg-gray-200 border dark:border-cyber-primary/20 border-cyber-secondary/20 placeholder-gray-400 dark:text-white text-black focus:outline-none focus:ring-2 dark:focus:ring-cyber-primary focus:ring-cyber-secondary focus:border-transparent"
                  />
                </div>
                <div v-if="env.type !== 'figma'">
                  <label :for="'backend-' + env.type" class="block text-xs text-gray-600 dark:text-gray-300">Backend URL</label>
                  <input
                    :id="'backend-' + env.type"
                    v-model="env.backend"
                    type="url"
                    class="appearance-none rounded-lg relative block w-full mt-2 px-4 py-3 dark:bg-cyber-black/50 bg-gray-200 border dark:border-cyber-primary/20 border-cyber-secondary/20 placeholder-gray-400 dark:text-white text-black focus:outline-none focus:ring-2 dark:focus:ring-cyber-primary focus:ring-cyber-secondary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-4">
            <NuxtLink
              to="/"
              class="px-6 py-3 rounded-lg border dark:border-cyber-primary/20 border-cyber-secondary/20 dark:text-cyber-primary text-cyber-secondary dark:hover:bg-cyber-primary/10 hover:bg-cyber-secondary/10"
            >
              Annuler
            </NuxtLink>
            <button
              type="submit"
              :disabled="saving"
              class="px-6 py-3 rounded-lg dark:bg-cyber-primary bg-cyber-secondary text-gray-300 dark:text-gray-600 dark:hover:bg-cyber-primary/90 hover:bg-cyber-secondary/90 disabled:opacity-50"
            >
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>

          <div v-if="error" class="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p class="text-red-400 text-sm">
              {{ error }}
            </p>
          </div>
        </form>
      </div>
    </template>

    <div v-else-if="error" class="text-red-500 text-center py-12">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const router = useRouter()
const { getProject, updateProject, deleteProject } = useProjects()
const { createEnvironment, updateEnvironment, deleteEnvironment } = useProjectEnvironments()
const { updateProjectTechStack, fetchAllTechnologies } = useTechStack()
const { uploadThumbnail } = useStorage()

const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)
const error = ref('')
const project = ref<any>(null)
const techStack = ref<string[]>([])
const thumbnailFile = ref<File | null>(null)
const thumbnailPreview = ref<string | null>(null)
const thumbnailType = ref<'url' | 'upload'>('url')
const availableTechnologies = ref<string[]>([])

const form = ref({
  name: '',
  description: '',
  status: 'in_development' as const,
  client: '',
  thumbnail: '',
  team_id: ''
})

const environments = ref([
  { type: 'development', label: 'Development', frontend: '', backend: '', id: null },
  { type: 'staging', label: 'Staging', frontend: '', backend: '', id: null },
  { type: 'production', label: 'Production', frontend: '', backend: '', id: null },
  { type: 'figma', label: 'Figma', frontend: '', backend: '', id: null }
])

// Load project data and technology suggestions
onMounted(async () => {
  try {
    const [projectData, technologies] = await Promise.all([
      getProject(route.params.id as string),
      fetchAllTechnologies()
    ])
    
    project.value = projectData
    availableTechnologies.value = technologies

    // Set form data
    form.value = {
      name: projectData.name,
      description: projectData.description || '',
      status: projectData.status,
      client: projectData.client || '',
      thumbnail: projectData.thumbnail || '',
      team_id: projectData.team_id
    }

    // Set tech stack
    techStack.value = projectData.project_tech_stack.map((tech: any) => tech.technology)

    // Set environments
    if (projectData.project_environments) {
      for (const env of projectData.project_environments) {
        const envIndex = environments.value.findIndex(e => e.type === env.env_type)
        if (envIndex !== -1) {
          environments.value[envIndex].frontend = env.frontend_url || ''
          environments.value[envIndex].backend = env.backend_url || ''
          environments.value[envIndex].id = env.id
        }
      }
    }
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

const handleThumbnailChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    thumbnailFile.value = file
    thumbnailPreview.value = URL.createObjectURL(file)
    form.value.thumbnail = ''
  }
}

const removeThumbnail = () => {
  thumbnailFile.value = null
  thumbnailPreview.value = null
  form.value.thumbnail = ''
}

const handleImageError = () => {
  form.value.thumbnail = ''
  error.value = 'Invalid image URL. Please provide a valid image URL.'
}

const handleSubmit = async () => {
  try {
    saving.value = true
    error.value = ''

    // Handle thumbnail based on type
    if (thumbnailType.value === 'upload' && thumbnailFile.value) {
      form.value.thumbnail = await uploadThumbnail(thumbnailFile.value)
    }

    // Update project
    await updateProject(project.value.id, form.value)

    // Update environments
    await Promise.all(
      environments.value.map(async env => {
        if (env.frontend || env.backend) {
          const envData = {
            project_id: project.value.id,
            env_type: env.type as any,
            frontend_url: env.frontend || null,
            backend_url: env.backend || null
          }

          if (env.id) {
            return updateEnvironment(env.id, envData)
          } else {
            return createEnvironment(envData)
          }
        } else if (env.id) {
          return deleteEnvironment(env.id)
        }
      })
    )

    // Update tech stack
    await updateProjectTechStack(project.value.id, techStack.value)

    router.push('/')
  } catch (e: any) {
    error.value = e.message
  } finally {
    saving.value = false
  }
}

const handleDelete = async () => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ? Cette action ne peut être annulée.')) {
    return
  }

  try {
    deleting.value = true
    await deleteProject(project.value.id)
    router.push('/')
  } catch (e: any) {
    error.value = e.message
  } finally {
    deleting.value = false
  }
}
</script>