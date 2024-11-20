<template>
  <div class="min-h-screen flex items-center justify-center ">
    <div class="max-w-md w-full space-y-8 p-8  backdrop-blur-md rounded-lg border dark:border-cyber-primary/20 border-cyber-secondary/20">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold dark:text-white text-gray-700">
          Entrer le mot de passe
        </h2>
        <p class="mt-2 text-center text-sm text-gray-400">
          Veuillez saisir le mot de passe d'accès pour visualiser les projets

        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handlePasswordSubmit">
        <div>
          <label for="password" class="sr-only">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="appearance-none rounded-lg relative block w-full px-4 py-3 dark:bg-cyber-black/50 bg-gray-200/50 border dark:border-cyber-primary/20 border-cyber-secondary/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 dark:focus:ring-cyber-primary focus:ring-cyber-secondary focus:border-transparent"
            placeholder="Entrer le mot de passe"
          />
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg dark:text-cyber-black text-white dark:bg-cyber-primary bg-cyber-secondary dark:hover:bg-cyber-primary/90 hover:bg-cyber-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-cyber-primary focus:ring-cyber-secondary"
            :disabled="loading"
          >
            {{ loading ? 'Vérification...' : 'Entrer' }}
          </button>
        </div>

        <div v-if="error" class="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p class="text-red-400 text-sm text-center">
            Le mot de passe que vous avez saisi est incorrect. Veuillez réessayer.
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

const handlePasswordSubmit = async () => {
  try {
    loading.value = true
    error.value = ''

    if (password.value === 'wow-digital12345') {
      localStorage.setItem('app-access', 'granted')
      await router.push('/')
    } else {
      error.value = 'Invalid password'
    }
  } finally {
    loading.value = false
  }
}

// Redirect if already authenticated
onMounted(() => {
  if (localStorage.getItem('app-access') === 'granted') {
    router.push('/')
  }
})
</script>