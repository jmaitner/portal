<template>
  <header class="bg-white border-b border-gray-200">
    <div class="container mx-auto max-w-7xl px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Left: Logo -->
        <div class="flex items-center space-x-3">
          <img src="/branding/logo.svg" alt="Road Ready Safety" class="h-8 w-auto" />
          <span class="text-lg font-semibold text-gray-900">Road Ready Safety</span>
        </div>
        
        <!-- Middle: Course title and breadcrumb -->
        <div class="flex-1 text-center">
          <h1 class="text-lg font-semibold text-gray-900">Florida Basic Driver Improvement</h1>
          <p class="text-sm text-gray-600">My Course › FL BDI</p>
        </div>
        
        <!-- Right: Progress, Support, Avatar -->
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
            <span class="text-sm font-medium text-blue-700">8%</span>
          </div>
          
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
