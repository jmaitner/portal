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
        <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
        <p class="mt-2 text-gray-600">Manage your account settings and preferences</p>
      </div>

      <!-- Settings Sections -->
      <div class="space-y-6">
        <!-- Security Settings -->
        <div class="bg-white rounded-xl border shadow-sm p-6 lg:p-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Security</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Change Password</h4>
                <p class="text-sm text-gray-500">Update your account password</p>
              </div>
              <UButton variant="outline" size="sm">
                Change Password
              </UButton>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                <p class="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <UButton variant="outline" size="sm">
                Enable 2FA
              </UButton>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Login History</h4>
                <p class="text-sm text-gray-500">View recent login activity</p>
              </div>
              <UButton variant="outline" size="sm">
                View History
              </UButton>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="bg-white rounded-xl border shadow-sm p-6 lg:p-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Email Notifications</h4>
                <p class="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <UToggle v-model="settings.emailNotifications" />
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">SMS Notifications</h4>
                <p class="text-sm text-gray-500">Receive updates via text message</p>
              </div>
              <UToggle v-model="settings.smsNotifications" />
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Course Reminders</h4>
                <p class="text-sm text-gray-500">Get reminded about incomplete courses</p>
              </div>
              <UToggle v-model="settings.courseReminders" />
            </div>
          </div>
        </div>

        <!-- Privacy Settings -->
        <div class="bg-white rounded-xl border shadow-sm p-6 lg:p-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Privacy</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Data Sharing</h4>
                <p class="text-sm text-gray-500">Allow us to use your data to improve our services</p>
              </div>
              <UToggle v-model="settings.dataSharing" />
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Marketing Communications</h4>
                <p class="text-sm text-gray-500">Receive promotional emails and offers</p>
              </div>
              <UToggle v-model="settings.marketingEmails" />
            </div>
          </div>
        </div>

        <!-- Account Actions -->
        <div class="bg-white rounded-xl border shadow-sm p-6 lg:p-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Account Actions</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Export Data</h4>
                <p class="text-sm text-gray-500">Download a copy of your data</p>
              </div>
              <UButton variant="outline" size="sm">
                Export Data
              </UButton>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-red-900">Delete Account</h4>
                <p class="text-sm text-red-600">Permanently delete your account and all data</p>
              </div>
              <UButton color="red" variant="outline" size="sm">
                Delete Account
              </UButton>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end">
          <UButton
            color="primary"
            @click="saveSettings"
            :loading="isSaving"
          >
            Save Settings
          </UButton>
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

// Settings data
const settings = ref({
  emailNotifications: true,
  smsNotifications: false,
  courseReminders: true,
  dataSharing: true,
  marketingEmails: false
})

const isSaving = ref(false)

// Save settings
const saveSettings = async () => {
  isSaving.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  console.log('Settings saved:', settings.value)
  isSaving.value = false
  
  // Show success message (in a real app)
  alert('Settings saved successfully!')
}
</script>
