<template>
  <div class="min-h-screen flex items-center justify-center bg-cyber-black">
    <div class="max-w-md w-full space-y-8 p-8 bg-cyber-darker/80 backdrop-blur-md rounded-lg border border-cyber-primary/20">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-white">
          Enter Access Password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-400">
          Please enter the access password to view projects
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handlePasswordSubmit">
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="appearance-none rounded-lg relative block w-full px-4 py-3 bg-cyber-black/50 border border-cyber-primary/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyber-primary focus:border-transparent"
            placeholder="Enter access password"
          />
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-cyber-black bg-cyber-primary hover:bg-cyber-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyber-primary"
            :disabled="loading"
          >
            {{ loading ? 'Verifying...' : 'Access Application' }}
          </button>
        </div>

        <div v-if="error" class="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p class="text-red-400 text-sm text-center">
            The password you entered is incorrect. Please try again.
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