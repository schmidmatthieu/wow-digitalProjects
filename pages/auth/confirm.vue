<template>
  <div class="min-h-screen flex items-center justify-center bg-cyber-black">
    <div class="max-w-md w-full p-8 bg-cyber-darker/80 backdrop-blur-md rounded-lg border border-cyber-primary/20 text-center">
      <h2 class="text-2xl font-bold text-white mb-4">
        Confirmation de votre login...
      </h2>
      <p class="text-gray-400">Veuillez patienter pendant que nous vérifions vos informations d'identification.</p>
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