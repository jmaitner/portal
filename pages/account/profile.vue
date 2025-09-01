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
        <h1 class="text-3xl font-bold text-gray-900">Profile</h1>
        <p class="mt-2 text-gray-600">Manage your account information and preferences</p>
      </div>

      <!-- Profile Form -->
      <div class="bg-white rounded-xl border shadow-sm p-6 lg:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Personal Information -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div class="md:col-span-2">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label for="state" class="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  id="state"
                  v-model="form.state"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select State</option>
                  <option value="FL">Florida</option>
                  <option value="TX">Texas</option>
                  <option value="MI">Michigan</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Preferences -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
            <div class="space-y-3">
              <div class="flex items-center">
                <input
                  id="emailNotifications"
                  v-model="form.emailNotifications"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="emailNotifications" class="ml-2 block text-sm text-gray-700">
                  Receive email notifications about course updates
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="smsNotifications"
                  v-model="form.smsNotifications"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="smsNotifications" class="ml-2 block text-sm text-gray-700">
                  Receive SMS notifications about course updates
                </label>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <UButton
              type="button"
              variant="ghost"
              @click="resetForm"
            >
              Cancel
            </UButton>
            <UButton
              type="submit"
              color="primary"
              :loading="isSubmitting"
            >
              Save Changes
            </UButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  layout: 'default'
})

// Form data
const form = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  state: 'FL',
  emailNotifications: true,
  smsNotifications: false
})

const isSubmitting = ref(false)

// Form handlers
const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  console.log('Profile updated:', form.value)
  isSubmitting.value = false
  
  // Show success message (in a real app)
  alert('Profile updated successfully!')
}

const resetForm = () => {
  // Reset to original values
  form.value = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    state: 'FL',
    emailNotifications: true,
    smsNotifications: false
  }
}
</script>
