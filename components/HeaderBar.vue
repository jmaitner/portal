<template>
  <header class="border-b bg-white">
    <div class="mx-auto max-w-[1120px] h-16 px-4 lg:px-6 flex items-center justify-between gap-4">
      <!-- Left: Logo and Brand -->
      <div class="flex items-center space-x-3">
        <img src="/branding/logo.svg" alt="Road Ready Safety" class="h-6 w-auto" />
        <span class="text-lg font-semibold text-gray-900">Road Ready Safety</span>
      </div>
      
      <!-- Center: Course Title/Breadcrumb (hidden on mobile) -->
      <div class="hidden md:flex items-center space-x-4 text-sm text-gray-600">
        <span>Florida Basic Driver Improvement</span>
        <span class="text-gray-400">›</span>
        <span>My Course › FL BDI</span>
      </div>
      
      <!-- Right: Progress Pill + Support + Avatar -->
      <div class="flex items-center space-x-4">
        <!-- Progress Pill -->
        <div class="hidden sm:flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          8%
        </div>
        
        <!-- Support Link -->
        <NuxtLink to="/support" class="text-gray-600 hover:text-gray-900 font-medium text-sm">
          Support
        </NuxtLink>
        
        <!-- Mobile Hamburger (hidden on desktop) -->
        <button class="lg:hidden w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <UIcon name="i-heroicons-bars-3" class="w-4 h-4 text-gray-600" />
        </button>
        
        <!-- Desktop Avatar (hidden on mobile) -->
        <div class="hidden lg:block relative">
          <button class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <UIcon name="i-heroicons-user" class="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
