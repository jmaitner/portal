<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-[1120px] px-4 lg:px-6 py-6 lg:py-10">
      <!-- Page Header -->
      <div class="mb-8">
        <div class="flex items-center space-x-4 mb-4">
          <NuxtLink 
            to="/courses" 
            class="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          >
            <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
            <span>Back to Courses</span>
          </NuxtLink>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Billing</h1>
        <p class="mt-2 text-gray-600">Manage your billing information and payment methods</p>
      </div>

      <!-- Billing Sections -->
      <div class="space-y-6">
        <!-- Current Plan -->
        <div class="bg-white rounded-xl border shadow-sm p-6 lg:p-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Current Plan</h3>
          <div class="bg-blue-50 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-lg font-medium text-blue-900">Basic Plan</h4>
                <p class="text-sm text-blue-700">$29.99/month</p>
                <p class="text-sm text-blue-600 mt-1">Next billing date: December 1, 2025</p>
              </div>
              <UButton variant="outline" size="sm">
                Change Plan
              </UButton>
            </div>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="bg-white rounded-xl border shadow-sm p-6 lg:p-8">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Payment Methods</h3>
            <UButton variant="outline" size="sm">
              <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
              Add Payment Method
            </UButton>
          </div>
          
          <div class="space-y-4">
            <!-- Default Payment Method -->
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span class="text-white text-xs font-medium">VISA</span>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                    <p class="text-xs text-gray-500">Expires 12/26</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Default
                  </span>
                  <UButton variant="ghost" size="sm">
                    Edit
                  </UButton>
                </div>
              </div>
            </div>

            <!-- Other Payment Method -->
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-6 bg-gray-600 rounded flex items-center justify-center">
                    <span class="text-white text-xs font-medium">MC</span>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">•••• •••• •••• 5555</p>
                    <p class="text-xs text-gray-500">Expires 08/27</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <UButton variant="ghost" size="sm">
                    Edit
                  </UButton>
                  <UButton variant="ghost" size="sm" color="red">
                    Remove
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Billing History -->
        <div class="bg-white rounded-xl border shadow-sm p-6 lg:p-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Billing History</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p class="text-sm font-medium text-gray-900">November 1, 2025</p>
                <p class="text-xs text-gray-500">Basic Plan - Monthly</p>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-sm font-medium text-gray-900">$29.99</span>
                <UButton variant="ghost" size="sm">
                  Download
                </UButton>
              </div>
            </div>
            
            <div class="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p class="text-sm font-medium text-gray-900">October 1, 2025</p>
                <p class="text-xs text-gray-500">Basic Plan - Monthly</p>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-sm font-medium text-gray-900">$29.99</span>
                <UButton variant="ghost" size="sm">
                  Download
                </UButton>
              </div>
            </div>
            
            <div class="flex items-center justify-between py-3">
              <div>
                <p class="text-sm font-medium text-gray-900">September 1, 2025</p>
                <p class="text-xs text-gray-500">Basic Plan - Monthly</p>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-sm font-medium text-gray-900">$29.99</span>
                <UButton variant="ghost" size="sm">
                  Download
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Billing Address -->
        <div class="bg-white rounded-xl border shadow-sm p-6 lg:p-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-900">John Doe</p>
            <p class="text-sm text-gray-600">123 Main Street</p>
            <p class="text-sm text-gray-600">Apt 4B</p>
            <p class="text-sm text-gray-600">Miami, FL 33101</p>
            <p class="text-sm text-gray-600">United States</p>
          </div>
          <div class="mt-4">
            <UButton variant="outline" size="sm">
              Update Billing Address
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  layout: 'default'
})
</script>
