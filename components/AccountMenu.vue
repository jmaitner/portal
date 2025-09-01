<template>
  <div class="relative">
    <!-- Account Button -->
    <button
      @click="isOpen = !isOpen"
      class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Account menu"
    >
      <UIcon name="i-heroicons-user" class="w-4 h-4 text-gray-600" />
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-56 bg-white rounded-lg border border-gray-200 shadow-lg z-50"
    >
      <!-- User Info -->
      <div class="px-4 py-3 border-b border-gray-200">
        <div class="text-sm font-medium text-gray-900">John Doe</div>
        <div class="text-sm text-gray-500">john.doe@example.com</div>
      </div>

      <!-- Menu Items -->
      <div class="py-1">
        <NuxtLink
          to="/account/profile"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          @click="isOpen = false"
        >
          <UIcon name="i-heroicons-user-circle" class="w-4 h-4 mr-3" />
          Profile
        </NuxtLink>
        
        <NuxtLink
          to="/account/settings"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          @click="isOpen = false"
        >
          <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4 mr-3" />
          Settings
        </NuxtLink>
        
        <NuxtLink
          to="/account/billing"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          @click="isOpen = false"
        >
          <UIcon name="i-heroicons-credit-card" class="w-4 h-4 mr-3" />
          Billing
        </NuxtLink>
        
        <div class="border-t border-gray-200 my-1"></div>
        
        <button
          @click="handleLogout"
          class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4 mr-3" />
          Sign Out
        </button>
      </div>
    </div>

    <!-- Backdrop to close menu -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40"
      @click="isOpen = false"
    ></div>
  </div>
</template>

<script setup>
const isOpen = ref(false)

// Close menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      isOpen.value = false
    }
  })
})

const handleLogout = () => {
  // In a real app, this would handle logout logic
  console.log('Logout clicked')
  isOpen.value = false
  // Navigate to login page
  navigateTo('/login')
}
</script>
