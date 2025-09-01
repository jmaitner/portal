<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-[1120px] px-4 lg:px-6 py-6 lg:py-10">
      <!-- Certificate Header -->
      <div class="text-center mb-8">
        <UIcon name="i-heroicons-academic-cap" class="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 class="text-3xl font-bold text-gray-900">Course Completion Certificate</h1>
        <p class="mt-2 text-gray-600">Certificate ID: {{ $route.params.id }}</p>
      </div>

      <!-- Certificate Content -->
      <div class="bg-white rounded-xl border shadow-sm p-8 max-w-2xl mx-auto">
        <div class="text-center space-y-6">
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Road Ready Safety</h2>
            <p class="text-gray-600">Certificate of Completion</p>
          </div>

          <div class="space-y-4">
            <p class="text-lg text-gray-700">
              This is to certify that the student has successfully completed the required course.
            </p>
            
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-sm text-gray-600">
                <strong>Certificate ID:</strong> {{ $route.params.id }}
              </p>
              <p class="text-sm text-gray-600">
                <strong>Date Issued:</strong> {{ currentDate }}
              </p>
            </div>
          </div>

          <div class="pt-6">
            <UButton to="/courses" color="primary" variant="outline">
              <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
              Back to My Courses
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

// Current date for certificate
const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>
