<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="#00FFF0" />
    <NuxtPage />
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
  background: rgba(0, 255, 240, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 240, 0.2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 240, 0.3);
}

.hover-glow {
  transition: all 0.2s ease-out;
}

.hover-glow:hover {
  box-shadow: 0 0 15px rgba(0, 255, 240, 0.15);
}

.status-badge {
  transition: background-color 0.2s ease-out, border-color 0.2s ease-out;
}
</style>