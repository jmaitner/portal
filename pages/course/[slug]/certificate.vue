<script setup>
import courses from '~/static-data/courses.json'

// Set layout
definePageMeta({
  layout: 'course'
})

const route = useRoute()
const course = courses

// Validate course slug
if (route.params.slug !== course.slug) {
  throw createError({ statusCode: 404, statusMessage: 'Course not found' })
}

const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header with progress -->
    <div class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-lg font-semibold text-gray-900">{{ course.title }}</h1>
          <p class="text-sm text-gray-600">Certificate</p>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-600">Progress</span>
          <UProgress 
            :value="course.meta.demoProgressPercent" 
            :max="100"
            class="w-32"
          />
          <span class="text-sm text-gray-600">{{ course.meta.demoProgressPercent }}%</span>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex">
      <!-- Left sidebar - Module tree -->
      <div class="w-80 bg-white border-r border-gray-200 p-6">
        <ModuleTree 
          current-module-id="certificate"
          current-lesson-id="cert"
        />
      </div>

      <!-- Right content area -->
      <div class="flex-1">
        <div class="p-8">
          <div class="max-w-4xl mx-auto">
            <!-- Certificate title -->
            <div class="mb-6">
              <h2 class="text-2xl font-semibold text-gray-900 mb-2">Course Certificate</h2>
              <p class="text-gray-600">Your certificate of completion for the Florida Basic Driver Improvement course.</p>
            </div>

            <!-- Certificate Preview -->
            <div class="bg-white rounded-lg border border-gray-200 p-8">
              <div class="text-center space-y-6">
                <!-- Certificate Header -->
                <div class="space-y-2">
                  <img src="/branding/logo.svg" alt="Road Ready Safety" class="h-12 w-auto mx-auto" />
                  <h3 class="text-2xl font-bold text-gray-900">Certificate of Completion</h3>
                  <p class="text-gray-600">This is to certify that</p>
                </div>

                <!-- Student Name -->
                <div class="py-4">
                  <p class="text-xl font-semibold text-gray-900 border-b-2 border-gray-300 pb-2">
                    [Student Name]
                  </p>
                </div>

                <!-- Course Details -->
                <div class="space-y-2">
                  <p class="text-gray-600">has successfully completed the</p>
                  <p class="text-lg font-semibold text-gray-900">{{ course.title }}</p>
                  <p class="text-gray-600">State: {{ course.state }}</p>
                  <p class="text-gray-600">Duration: {{ course.durationMin }} minutes</p>
                </div>

                <!-- Completion Date -->
                <div class="pt-4">
                  <p class="text-gray-600">Completed on</p>
                  <p class="text-lg font-semibold text-gray-900">{{ currentDate }}</p>
                </div>

                <!-- Certificate Number -->
                <div class="pt-4 border-t border-gray-200">
                  <p class="text-sm text-gray-500">Certificate #: FL-BDI-{{ Date.now().toString().slice(-8) }}</p>
                </div>

                <!-- Disclaimer -->
                <div class="pt-4 text-xs text-gray-500 max-w-md mx-auto">
                  <p>This certificate is issued for educational purposes and satisfies the requirements for Florida Basic Driver Improvement course completion.</p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-6 flex justify-center space-x-4">
              <UButton
                color="gray"
                variant="outline"
                icon="i-heroicons-arrow-left"
                to="/course/fl-bdi/final-exam"
              >
                Back to Exam
              </UButton>
              
              <UButton
                color="primary"
                icon="i-heroicons-document-arrow-down"
                disabled
                :title="'Demo only - Download not available'"
              >
                Download PDF
              </UButton>
              
              <UButton
                color="gray"
                variant="outline"
                icon="i-heroicons-home"
                to="/dashboard"
              >
                Back to Dashboard
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom toolbar -->
    <div class="bg-white border-t border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <UButton
          to="/course/fl-bdi/final-exam"
          color="gray"
          variant="outline"
          icon="i-heroicons-arrow-left"
        >
          Back to Exam
        </UButton>
        
        <UButton
          to="/dashboard"
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark"
        >
          Exit
        </UButton>
        
        <div></div>
      </div>
    </div>
  </div>
</template>
