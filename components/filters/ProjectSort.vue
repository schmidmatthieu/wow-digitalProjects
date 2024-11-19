<template>
  <div class="w-64">
    <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
      Trier par
    </label>
    <div class="flex items-center gap-2">
      <div class="relative flex-1">
        <select
          v-model="sortBy"
          class="w-full px-4 py-1 pr-12 rounded-lg bg-gray-200 dark:bg-cyber-darker border border-cyber-secondary/20 dark:border-cyber-primary/20 text-gray-600 dark:text-gray-300 placeholder-gray-600 dark:placeholder-gray-300 focus:outline-none focus:ring-2 dark:focus:ring-cyber-primary focus:ring-cyber-secondary focus:border-transparent appearance-none"
        >
          <option value="status">Status</option>
          <option value="created_at">Date de création</option>
          <option value="name">Nom</option>
          <option value="client">Client</option>
        </select>
        <vue-feather
          type="chevron-down"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-primary pointer-events-none"
        />
      </div>
      
      <button
        @click="toggleOrder"
        class="inline-flex items-center px-3 py-2 rounded-lg bg-gray-200 dark:bg-cyber-darker border border-cyber-secondary/20 dark:border-cyber-primary/20 text-cyber-primary dark:hover:bg-cyber-primary/10 hover:bg-cyber-secondary/10 transition-all duration-200"
        :title="sortOrder === 'asc' ? 'Ascending' : 'Descending'"
      >
        <vue-feather
          :type="sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'"
          class="w-4 h-4"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SortOptions {
  by: string
  order: 'asc' | 'desc'
}

const props = defineProps<{
  modelValue: SortOptions
}>()

const emit = defineEmits<{
  'update:modelValue': [value: SortOptions]
}>()

const sortBy = computed({
  get: () => props.modelValue.by,
  set: (value) => emit('update:modelValue', { ...props.modelValue, by: value })
})

const sortOrder = computed({
  get: () => props.modelValue.order,
  set: (value) => emit('update:modelValue', { ...props.modelValue, order: value })
})

const toggleOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>