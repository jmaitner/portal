<template>
  <div class="min-h-screen bg-gray-50">
    <HeaderBar />
    <main class="container mx-auto max-w-7xl px-6 py-8">
      <slot />
    </main>
    <FooterBar />
  </div>
</template>
