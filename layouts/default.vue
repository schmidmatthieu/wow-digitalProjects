<template>
  <div class="min-h-screen bg-cyber-black">
    <AppSidebar />
    <div class="lg:pl-64">
      <AppHeader />
      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>