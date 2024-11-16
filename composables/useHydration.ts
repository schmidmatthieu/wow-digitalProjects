import { ref, onMounted } from 'vue'

export function useHydration() {
  const isHydrated = ref(false)

  onMounted(() => {
    isHydrated.value = true
  })

  return {
    isHydrated
  }
}