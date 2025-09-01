<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <img src="/branding/logo.svg" alt="Road Ready Safety" class="h-12 w-auto" />
      </div>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Two-Factor Authentication
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Enter the 6-digit code sent to your device
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- 2FA Code Input -->
          <div>
            <label for="code" class="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <div class="mt-1">
              <input
                id="code"
                v-model="code"
                type="text"
                maxlength="6"
                pattern="[0-9]{6}"
                inputmode="numeric"
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="000000"
                required
              />
            </div>
            <p class="mt-2 text-sm text-gray-500">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <!-- Remember Device Checkbox -->
          <div class="flex items-center">
            <input
              id="remember-device"
              v-model="rememberDevice"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember-device" class="ml-2 block text-sm text-gray-700">
              Remember this device for 30 days
            </label>
          </div>

          <!-- Submit Button -->
          <div>
            <UButton
              type="submit"
              color="primary"
              size="lg"
              block
              :loading="isSubmitting"
            >
              Verify & Continue
            </UButton>
          </div>

          <!-- Alternative Actions -->
          <div class="flex items-center justify-between">
            <button
              type="button"
              @click="resendCode"
              class="text-sm text-blue-600 hover:text-blue-500"
              :disabled="resendCountdown > 0"
            >
              {{ resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend Code' }}
            </button>
            <button
              type="button"
              @click="useBackupCode"
              class="text-sm text-gray-600 hover:text-gray-500"
            >
              Use Backup Code
            </button>
          </div>
        </form>

        <!-- Back to Login -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <div class="mt-6">
            <NuxtLink
              to="/login"
              class="flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
              Back to Login
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  layout: false
})

// Form data
const code = ref('')
const rememberDevice = ref(false)
const isSubmitting = ref(false)
const resendCountdown = ref(0)

// Form validation
const isValidCode = computed(() => {
  return /^\d{6}$/.test(code.value)
})

// Handle form submission
const handleSubmit = async () => {
  if (!isValidCode.value) {
    alert('Please enter a valid 6-digit code')
    return
  }

  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  console.log('2FA verification:', {
    code: code.value,
    rememberDevice: rememberDevice.value
  })
  
  isSubmitting.value = false
  
  // In a real app, this would verify the code and redirect
  // For demo purposes, just show success and redirect to courses
  alert('2FA verification successful!')
  navigateTo('/courses')
}

// Resend code functionality
const resendCode = async () => {
  if (resendCountdown.value > 0) return
  
  resendCountdown.value = 30
  
  const interval = setInterval(() => {
    resendCountdown.value--
    if (resendCountdown.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
  
  // Simulate resending code
  console.log('Resending 2FA code...')
  alert('New verification code sent!')
}

// Use backup code
const useBackupCode = () => {
  alert('Backup code functionality would be implemented here')
}

// Auto-focus on code input
onMounted(() => {
  const codeInput = document.getElementById('code')
  if (codeInput) {
    codeInput.focus()
  }
})
</script>
