<script setup>
import courses from '~/static-data/courses.json'

const route = useRoute()
const course = courses

// Validate course slug
if (route.params.slug !== course.slug) {
  throw createError({ statusCode: 404, statusMessage: 'Course not found' })
}
</script>

<template>
  <div class="space-y-8">
    <!-- Hero Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div class="text-center space-y-4">
        <h1 class="text-3xl font-bold text-gray-900">{{ course.title }}</h1>
        <div class="flex items-center justify-center space-x-4 text-gray-600">
          <span class="flex items-center">
            <UIcon name="i-heroicons-map-pin" class="w-4 h-4 mr-1" />
            {{ course.state }}
          </span>
          <span class="flex items-center">
            <UIcon name="i-heroicons-clock" class="w-4 h-4 mr-1" />
            {{ course.durationMin }} minutes
          </span>
          <span class="flex items-center">
            <UIcon name="i-heroicons-academic-cap" class="w-4 h-4 mr-1" />
            {{ course.passPercent }}% pass rate
          </span>
        </div>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">{{ course.summary }}</p>
      </div>
    </div>

    <!-- What You'll Learn -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-6">What You'll Learn</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex items-start space-x-3">
          <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-500 mt-0.5" />
          <div>
            <h3 class="font-medium text-gray-900">Traffic Laws & Regulations</h3>
            <p class="text-gray-600 text-sm">Master Florida's traffic laws, speed limits, and right-of-way rules</p>
          </div>
        </div>
        <div class="flex items-start space-x-3">
          <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-500 mt-0.5" />
          <div>
            <h3 class="font-medium text-gray-900">Defensive Driving</h3>
            <p class="text-gray-600 text-sm">Learn hazard recognition and defensive driving techniques</p>
          </div>
        </div>
        <div class="flex items-start space-x-3">
          <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-500 mt-0.5" />
          <div>
            <h3 class="font-medium text-gray-900">Court Requirements</h3>
            <p class="text-gray-600 text-sm">Satisfy court-ordered driver improvement requirements</p>
          </div>
        </div>
        <div class="flex items-start space-x-3">
          <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-500 mt-0.5" />
          <div>
            <h3 class="font-medium text-gray-900">Certificate</h3>
            <p class="text-gray-600 text-sm">Receive your completion certificate upon finishing</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="text-center">
      <UButton 
        to="/course/fl-bdi/learn/m1/l1"
        color="primary"
        size="xl"
        class="px-8 py-4"
      >
        Start Course
      </UButton>
    </div>
  </div>
</template>
