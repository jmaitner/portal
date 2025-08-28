<template>
  <header class="bg-white border-b border-gray-200">
    <div class="container mx-auto max-w-7xl px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <img src="/branding/logo.svg" alt="Road Ready Safety" class="h-8 w-auto" />
          <span class="text-lg font-semibold text-gray-900">Road Ready Safety</span>
        </div>
        <nav class="flex items-center space-x-6">
          <NuxtLink to="/dashboard" class="text-gray-600 hover:text-gray-900 font-medium">
            My Course
          </NuxtLink>
          <NuxtLink to="/support" class="text-gray-600 hover:text-gray-900 font-medium">
            Support
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>
