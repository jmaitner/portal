<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <img src="/branding/logo.svg" alt="Road Ready Safety" class="h-12 w-auto" />
      </div>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <NuxtLink to="/enroll/fl-bdi" class="font-medium text-blue-600 hover:text-blue-500">
          continue your registration
        </NuxtLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                :class="[
                  'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                  errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                ]"
                :aria-invalid="!!errors.email"
                aria-describedby="email-error"
              />
            </div>
            <p v-if="errors.email" id="email-error" class="mt-2 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                :class="[
                  'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                  errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                ]"
                :aria-invalid="!!errors.password"
                aria-describedby="password-error"
              />
            </div>
            <p v-if="errors.password" id="password-error" class="mt-2 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.rememberMe"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <UButton
              type="submit"
              color="primary"
              size="lg"
              block
              :loading="isSubmitting"
              class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign in
            </UButton>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white px-2 text-gray-500">Demo only</span>
            </div>
          </div>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              This is a demonstration login form. In a real application, this would authenticate users.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

const errors = ref({})
const isSubmitting = ref(false)

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.email) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }
  
  if (!form.value.password) {
    errors.value.password = 'Password is required'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleLogin = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Demo: show success message and redirect to dashboard
  alert('Demo: Login successful! Redirecting to dashboard...')
  await navigateTo('/dashboard')
  
  isSubmitting.value = false
}
</script>
