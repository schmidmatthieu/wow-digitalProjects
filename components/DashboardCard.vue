<template>
  <div class="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow">
    <div class="p-5">
      <div class="flex items-center">
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
            {{ title }}
          </p>
          <p class="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
            {{ value }}
          </p>
        </div>
        <div class="flex items-center">
          <span
            :class="[
              trend === 'up' ? 'text-green-500' : 'text-red-500',
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
            ]"
          >
            {{ change }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
}>()
</script>