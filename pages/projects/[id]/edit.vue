<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-primary mx-auto"></div>
    </div>

    <template v-else-if="project">
      <div class="bg-cyber-darker/80 backdrop-blur-md rounded-lg border border-cyber-primary/20 p-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-2xl font-bold text-white">Edit Project</h1>
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
              <label for="name" class="block text-sm font-medium text-gray-300">Project Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="mt-1 block w-full px-4 py-3 rounded-lg bg-cyber-black/50 border border-cyber-primary/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-primary focus:border-transparent"
              />
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-300">Description</label>
              <textarea
                id="description"
                v-model="form.description"
                rows="3"
                class="mt-1 block w-full px-4 py-3 rounded-lg bg-cyber-black/50 border border-cyber-primary/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-primary focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label for="client" class="block text-sm font-medium text-gray-300">Client</label>
              <input
                id="client"
                v-model="form.client"
                type="text"
                class="mt-1 block w-full px-4 py-3 rounded-lg bg-cyber-black/50 border border-cyber-primary/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-primary focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Thumbnail</label>
              <div class="space-y-4">
                <!-- Thumbnail Type Selection -->
                <div class="flex space-x-4">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      v-model="thumbnailType"
                      value="url"
                      class="form-radio text-cyber-primary"
                    />
                    <span class="ml-2 text-sm text-gray-300">URL</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      v-model="thumbnailType"
                      value="upload"
                      class="form-radio text-cyber-primary"
                    />
                    <span class="ml-2 text-sm text-gray-300">Upload</span>
                  </label>
                </div>

                <!-- URL Input -->
                <div v-if="thumbnailType === 'url'" class="space-y-2">
                  <input
                    v-model="form.thumbnail"
                    type="url"
                    placeholder="Enter image URL"
                    class="block w-full px-4 py-3 rounded-lg bg-cyber-black/50 border border-cyber-primary/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-primary focus:border-transparent"
                  />
                  <img
                    v-if="form.thumbnail"
                    :src="form.thumbnail"
                    alt="Thumbnail preview"
                    class="h-32 w-32 object-cover rounded-lg"
                    @error="handleImageError"
                  />
                </div>

                <!-- File Upload -->
                <div v-else class="space-y-2">
                  <div
                    class="relative w-32 h-32 border-2 border-dashed rounded-lg border-cyber-primary/20 hover:border-cyber-primary/40 transition-colors"
                    :class="{ 'border-solid': thumbnailPreview }"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      @change="handleThumbnailChange"
                    />
                    <div class="absolute inset-0 flex items-center justify-center">
                      <template v-if="thumbnailPreview">
                        <img
                          :src="thumbnailPreview"
                          alt="Thumbnail preview"
                          class="w-full h-full object-cover rounded-lg"
                        />
                      </template>
                      <template v-else>
                        <PhotoIcon class="w-8 h-8 text-cyber-primary/40" />
                      </template>
                    </div>
                  </div>
                  <div v-if="thumbnailPreview" class="flex-1">
                    <button
                      type="button"
                      @click="removeThumbnail"
                      class="text-sm text-red-400 hover:text-red-300"
                    >
                      Remove image
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label for="status" class="block text-sm font-medium text-gray-300">Status</label>
              <select
                id="status"
                v-model="form.status"
                required
                class="mt-1 block w-full px-4 py-3 rounded-lg bg-cyber-black/50 border border-cyber-primary/20 text-white focus:outline-none focus:ring-2 focus:ring-cyber-primary focus:border-transparent"
              >
                <option value="in_development">In Development</option>
                <option value="in_maintenance">In Maintenance</option>
                <option value="in_production">In Production</option>
                <option value="upcoming">Upcoming</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <!-- Tech Stack -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Tech Stack</label>
            <div class="flex flex-wrap gap-2">
              <input
                v-model="newTech"
                @keydown.enter.prevent="addTech"
                type="text"
                placeholder="Add technology..."
                class="px-4 py-2 rounded-lg bg-cyber-black/50 border border-cyber-primary/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-primary focus:border-transparent"
              />
              <button
                type="button" ```vue
                @click="addTech"
                class="px-4 py-2 rounded-lg bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/20 hover:bg-cyber-primary/20"
              >
                Add
              </button>
            </div>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="tech in techStack"
                :key="tech"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/20"
              >
                {{ tech }}
                <button
                  type="button"
                  @click="removeTech(tech)"
                  class="ml-2 text-cyber-primary hover:text-cyber-primary/70"
                >
                  ×
                </button>
              </span>
            </div>
          </div>

          <!-- Environments -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-white">Environments</h3>

            <div v-for="env in environments" :key="env.type" class="space-y-2">
              <h4 class="text-sm font-medium text-gray-300 capitalize">{{ env.label }}</h4>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label :for="'frontend-' + env.type" class="block text-xs text-gray-400">Frontend URL</label>
                  <input
                    :id="'frontend-' + env.type"
                    v-model="env.frontend"
                    type="url"
                    class="mt-1 block w-full px-4 py-2 rounded-lg bg-cyber-black/50 border border-cyber-primary/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label :for="'backend-' + env.type" class="block text-xs text-gray-400">Backend URL</label>
                  <input
                    :id="'backend-' + env.type"
                    v-model="env.backend"
                    type="url"
                    class="mt-1 block w-full px-4 py-2 rounded-lg bg-cyber-black/50 border border-cyber-primary/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-4">
            <NuxtLink
              to="/"
              class="px-6 py-3 rounded-lg border border-cyber-primary/20 text-cyber-primary hover:bg-cyber-primary/10"
            >
              Cancel
            </NuxtLink>
            <button
              type="submit"
              :disabled="saving"
              class="px-6 py-3 rounded-lg bg-cyber-primary text-cyber-black hover:bg-cyber-primary/90 disabled:opacity-50"
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
import { PhotoIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const router = useRouter()
const { getProject, updateProject, deleteProject } = useProjects()
const { createEnvironment, updateEnvironment, deleteEnvironment } = useProjectEnvironments()
const { updateProjectTechStack } = useTechStack()
const { uploadThumbnail } = useStorage()

const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)
const error = ref('')
const project = ref<any>(null)
const newTech = ref('')
const techStack = ref<string[]>([])
const thumbnailFile = ref<File | null>(null)
const thumbnailPreview = ref<string | null>(null)
const thumbnailType = ref<'url' | 'upload'>('url')

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
  { type: 'production', label: 'Production', frontend: '', backend: '', id: null }
])

// Load project data
onMounted(async () => {
  try {
    const projectData = await getProject(route.params.id as string)
    project.value = projectData

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
    if (projectData.environments) {
      for (const env of projectData.environments) {
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

const addTech = () => {
  if (newTech.value && !techStack.value.includes(newTech.value)) {
    techStack.value.push(newTech.value)
    newTech.value = ''
  }
}

const removeTech = (tech: string) => {
  techStack.value = techStack.value.filter(t => t !== tech)
}

const handleThumbnailChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    thumbnailFile.value = file
    thumbnailPreview.value = URL.createObjectURL(file)
    form.value.thumbnail = '' // Clear URL when uploading file
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
  if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
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