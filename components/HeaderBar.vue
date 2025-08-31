<template>
  <header class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-12 py-4">
      <div class="flex items-center justify-between">
        <!-- Left: Logo and Brand -->
        <div class="flex items-center space-x-3">
          <img src="/branding/logo.svg" alt="Road Ready Safety" class="h-6 w-auto" />
          <span class="text-lg font-semibold text-gray-900">Road Ready Safety</span>
        </div>
        
        <!-- Right: Support, Avatar -->
        <div class="flex items-center space-x-6">
          <NuxtLink to="/support" class="text-gray-600 hover:text-gray-900 font-medium text-sm">
            Support
          </NuxtLink>
          
          <div class="relative">
            <button class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <UIcon name="i-heroicons-user" class="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
