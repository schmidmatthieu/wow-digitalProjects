<template>
  <div class="w-56">
    <label class="block text-sm font-medium text-gray-300 mb-2">
      Sort By
    </label>
    <div class="flex items-center gap-2">
      <div class="relative flex-1">
        <select
          v-model="sortBy"
          class="w-full px-4 py-1 pr-12 rounded-lg bg-cyber-black/50 border border-cyber-primary/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-primary focus:border-transparent appearance-none"
        >
          <option value="status">Status</option>
          <option value="created_at">Creation Date</option>
          <option value="name">Project Name</option>
          <option value="client">Client Name</option>
        </select>
        <vue-feather
          type="chevron-down"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-primary pointer-events-none"
        />
      </div>
      
      <button
        @click="toggleOrder"
        class="inline-flex items-center px-3 py-2 rounded-lg bg-cyber-black/50 border border-cyber-primary/20 text-cyber-primary hover:bg-cyber-primary/10 transition-all duration-200"
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