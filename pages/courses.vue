<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-[1120px] px-4 lg:px-6 py-6 lg:py-10">
      <!-- Page header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">My Courses</h1>
        <p class="mt-2 text-gray-600">Manage your course enrollments and track your progress</p>
      </div>

      <!-- Course grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard
          v-for="course in enrollments"
          :key="course.courseId"
          :course="course"
        />
      </div>

      <!-- Empty state (if no courses) -->
      <div v-if="enrollments.length === 0" class="text-center py-12">
        <UIcon name="i-heroicons-academic-cap" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
        <p class="text-gray-600 mb-6">Get started by enrolling in your first course</p>
        <UButton to="/enroll/fl-bdi" color="primary">
          <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
          Enroll in Course
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import static data
import enrollmentsData from '~/static-data/enrollments.json'

// Page metadata
definePageMeta({
  layout: 'default'
})

// Use the enrollments data
const enrollments = ref(enrollmentsData)
</script>
