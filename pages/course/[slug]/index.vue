<script setup>
// Redirect to the unified course workspace
const route = useRoute()
await navigateTo(`/course/${route.params.slug}`)
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-blue-500 mx-auto mb-4 animate-spin" />
      <p class="text-gray-600">Redirecting to course workspace...</p>
    </div>
  </div>
</template>
