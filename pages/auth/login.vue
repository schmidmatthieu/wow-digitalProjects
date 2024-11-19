<template>
  <div class="min-h-screen flex items-center justify-center ">
    <div class="max-w-md w-full space-y-8 p-8 dark:bg-cyber-darker/80 bg-cyber-lighter/80 backdrop-blur-md rounded-lg border dark:border-cyber-primary/20 border-cyber-secondary/20">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-600 dark:text-gray-300">
          Connexion de l'administrateur
        </h2>
        <p class="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          Connectez-vous avec vos identifiants d'administrateur pour gérer les projets.
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="sr-only">Adresse email </label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-lg relative block w-full px-4 py-3 dark:bg-cyber-black/50 bg-gray-200 border dark:border-cyber-primary/20 border-cyber-secondary/20 placeholder-gray-400 dark:text-white text-black focus:outline-none focus:ring-2 dark:focus:ring-cyber-primary focus:ring-cyber-secondary focus:border-transparent"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-lg relative block w-full px-4 py-3 dark:bg-cyber-black/50 bg-gray-200 border dark:border-cyber-primary/20 border-cyber-secondary/20 placeholder-gray-400 dark:text-white text-black focus:outline-none focus:ring-2 dark:focus:ring-cyber-primary focus:ring-cyber-secondary focus:border-transparent"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg dark:text-cyber-black text-white dark:bg-cyber-primary bg-cyber-secondary dark:hover:bg-cyber-primary/90 hover:bg-cyber-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-cyber-primary focus:ring-cyber-secondary"
            :disabled="loading"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 dark:text-cyber-black text-white" aria-hidden="true" />
            </span>
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>

        <div v-if="error" class="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p class="text-red-400 text-sm text-center">
            {{ formatError(error) }}
          </p>
        </div>

        <div class="text-center">
          <NuxtLink
            to="/"
            class="text-sm text-cyber-primary hover:text-cyber-primary/80"
          >
            ← Retour aux projets
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LockClosedIcon } from '@heroicons/vue/24/solid'

const client = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const formatError = (error: string) => {
  switch (error) {
    case 'Invalid login credentials':
      return 'The email or password you entered is incorrect. Please try again.'
    case 'Email not confirmed':
      return 'Please verify your email address before signing in.'
    default:
      return error
  }
}

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''

    const { error: signInError } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (signInError) throw signInError

    await router.push('/')
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>