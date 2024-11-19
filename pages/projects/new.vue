<template>
  <div class="max-w-4xl mx-auto">
    <div class="dark:bg-cyber-darker/80 bg-cyber-lighter/80 backdrop-blur-md rounded-lg border dark:border-cyber-primary/20 border-cyber-secondary/20 p-8">
      <h1 class="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-8">Créer un nouveau projet</h1>

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
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Thumbnail</label>
            <div class="space-y-4">
              <!--
              
              <div class="flex space-x-4">
                
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    v-model="thumbnailType"
                    value="url"
                    class="form-radio text-cyber-primary"
                  />
                  <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">URL</span>
                </label>
                
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    v-model="thumbnailType"
                    value="upload"
                    class="form-radio text-cyber-primary"
                  />
                  <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">Upload</span>
                </label>
              </div>
                -->

              <!-- URL Input -->
              <div v-if="thumbnailType === 'url'" class="space-y-2">
                <input
                  v-model="form.thumbnail"
                  type="url"
                  placeholder="Enter image URL"
                  class="block w-full px-4 py-3 rounded-lg dark:bg-cyber-black/50 bg-gray-200 border dark:border-cyber-primary/20 border-cyber-secondary/20 placeholder-gray-400 dark:text-white text-black focus:outline-none focus:ring-2 dark:focus:ring-cyber-primary focus:ring-cyber-secondary focus:border-transparent"
                  @blur="validateImageUrl"
                />
                <img
                  v-if="validatedThumbnailUrl"
                  :src="validatedThumbnailUrl"
                  alt="Thumbnail preview"
                  class="h-32 w-32 object-cover rounded-lg"
                  @error="handleImageError"
                />
              </div>

              <!-- File Upload -->
              <div v-else class="space-y-2">
                <div
                  class="relative w-32 h-32 border-2 border-dashed rounded-lg dark:border-cyber-primary/20 border-cyber-secondary/20 dark:hover:border-cyber-primary/40 hover:border-cyber-secondary/40 transition-colors cursor-pointer"
                  :class="{ 'border-solid': thumbnailPreview }"
                >
                  <input
                    type="file"
                    accept="image/*"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
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
                      <vue-feather type="image" class="w-8 h-8 dark:text-cyber-primary/40 text-cyber-secondary/40 absolute top-4" />
                      <span class="text-xs text-center mt-2 dark:text-gray-400 text-gray-600 absolute bottom-4">Cliquez ou déposez une image</span>
                    </template>
                  </div>
                </div>
                <div v-if="thumbnailPreview" class="flex-1">
                  <button
                    type="button"
                    @click="removeThumbnail"
                    class="text-sm text-red-400 hover:text-red-300"
                  >
                    Effacer l'image
                  </button>
                </div>
              </div>
            </div>
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
            :disabled="loading"
            class="px-6 py-3 rounded-lg dark:bg-cyber-primary bg-cyber-secondary text-gray-300 dark:text-gray-600 dark:hover:bg-cyber-primary/90 hover:bg-cyber-secondary/90 disabled:opacity-50"
          >
            {{ loading ? 'Ajout...' : 'Ajouter le projet' }}
          </button>
        </div>

        <div v-if="error" class="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p class="text-red-400 text-sm">
            {{ error }}
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const { supabase } = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const { createProject } = useProjects()
const { createEnvironment } = useProjectEnvironments()
const { updateProjectTechStack } = useTechStack()
const { fetchUserTeam } = useTeams()
const { uploadThumbnail } = useStorage()
const { fetchAllTechnologies } = useTechStack()

const loading = ref(false)
const error = ref('')
const techStack = ref<string[]>([])
const validatedThumbnailUrl = ref('')
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
  { type: 'development', label: 'Development', frontend: '', backend: '' },
  { type: 'staging', label: 'Staging', frontend: '', backend: '' },
  { type: 'production', label: 'Production', frontend: '', backend: '' },
  { type: 'figma', label: 'Figma', frontend: '', backend: '' }
])

const handleThumbnailChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    
    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      error.value = "L'image ne doit pas dépasser 2MB"
      return
    }

    // Display preview
    thumbnailFile.value = file
    thumbnailPreview.value = URL.createObjectURL(file)
  }
}

const removeThumbnail = () => {
  thumbnailFile.value = null
  thumbnailPreview.value = null
  form.value.thumbnail = ''
  validatedThumbnailUrl.value = ''
}

const validateImageUrl = () => {
  if (form.value.thumbnail && form.value.thumbnail.trim() !== '') {
    // Verify URL validity
    try {
      new URL(form.value.thumbnail)
      validatedThumbnailUrl.value = form.value.thumbnail
    } catch {
      handleImageError()
    }
  } else {
    validatedThumbnailUrl.value = ''
  }
}

const handleImageError = () => {
  form.value.thumbnail = ''
  validatedThumbnailUrl.value = ''
  error.value = 'Invalid image URL. Please provide a valid image URL.'
}

const handleSubmit = async () => {
  try {
  console.log('Auth status:', !!user.value)
  try {
    const session = await supabase?.auth?.getSession()
    console.log('Auth session:', session)
  } catch (sessionError) {
    console.error('Session error:', sessionError)
  }
  loading.value = true
  error.value = ''

    // Get user's team ID
    const teamId = await fetchUserTeam()
    form.value.team_id = teamId

    // Handle thumbnail based on type
    if (thumbnailType.value === 'upload' && thumbnailFile.value) {
      form.value.thumbnail = await uploadThumbnail(thumbnailFile.value)
    }

    // Create project
    const project = await createProject(form.value)

    // Create environments
    await Promise.all(
      environments.value.map(env => {
        if (env.frontend || env.backend) {
          return createEnvironment({
            project_id: project.id,
            env_type: env.type as any,
            frontend_url: env.frontend || null,
            backend_url: env.backend || null
          })
        }
      })
    )

    // Add tech stack
    if (techStack.value.length > 0) {
      await updateProjectTechStack(project.id, techStack.value)
    }

    router.push('/')
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// Load technology suggestions
onMounted(async () => {
  try {
    availableTechnologies.value = await fetchAllTechnologies()
  } catch (e) {
    console.error('Failed to load technology suggestions:', e)
  }
})
</script>