<template>
  <div class="min-h-screen bg-cyber-black text-white">
    <AppSidebar />
    <div class="lg:pl-64">
      <AppHeader />
      <main class="p-8 mt-[88px]">
        <slot />
      </main>
    </div>
  </div>
</template>