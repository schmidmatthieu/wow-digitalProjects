<template >
  <NuxtLayout class="dark:bg-cyber-darker bg-gray-100">
    <NuxtLoadingIndicator color="#4F46E5" />
    <NuxtPage  />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}

/* Light mode styles */


.light .bg-cyber-darker {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-color: rgba(79, 70, 229, 0.1);
}

.light .text-cyber-primary {
  color: #4F46E5;
}

.light .border-cyber-primary {
  border-color: rgba(79, 70, 229, 0.2);
}

.light .hover\:bg-cyber-primary\/10:hover {
  background-color: rgba(79, 70, 229, 0.1);
}

/* Dark mode styles */


.dark .bg-cyber-darker {
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(12px);
}

/* Shared styles */
.hover-glow {
  transition: all 0.2s ease-out;
}

.hover-glow:hover {
  box-shadow: 0 0 15px rgba(79, 70, 229, 0.2);
}

.status-badge {
  transition: background-color 0.2s ease-out, border-color 0.2s ease-out;
}

</style>