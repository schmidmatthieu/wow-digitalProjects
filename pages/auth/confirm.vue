<template>
  <div class="min-h-screen flex items-center justify-center bg-cyber-black">
    <div class="max-w-md w-full p-8 backdrop-blur-md rounded-lg border dark:border-cyber-primary/20 border-cyber-secondary/20 text-center">
      <h2 class="text-2xl font-bold dark:text-white text-black mb-4">
        Confirmation de votre login...
      </h2>
      <p class="dark:text-gray-400 text-gray-600">Veuillez patienter pendant que nous vérifions vos informations d'identification.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const router = useRouter()

onMounted(async () => {
  await client.auth.getSession()
  await router.push('/')
})
</script>