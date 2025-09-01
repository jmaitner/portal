<template>
  <UCard class="rounded-xl border shadow-sm hover:shadow transition-shadow">
    <!-- Header: Course title + state badge -->
    <div class="flex items-start justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900 pr-4">{{ course.title }}</h3>
      <UBadge :color="getStateColor(course.status)" variant="soft" size="sm">
        {{ course.state }}
      </UBadge>
    </div>

    <!-- Body content -->
    <div class="space-y-4">
      <!-- Status row -->
      <div class="flex items-center space-x-2">
        <UIcon 
          :name="getStatusIcon(course.status)" 
          :class="getStatusIconColor(course.status)"
          class="w-5 h-5"
        />
        <UBadge :color="getStatusBadgeColor(course.status)" variant="soft" size="sm">
          {{ getStatusText(course.status, course.progressPercent) }}
        </UBadge>
      </div>

      <!-- Dates -->
      <div class="text-sm text-gray-600 space-y-1">
        <div class="flex items-center space-x-2">
          <span class="font-medium">Started:</span>
          <span>{{ course.dateStarted ? formatDate(course.dateStarted) : '—' }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-medium">Completed:</span>
          <span>{{ course.dateCompleted ? formatDate(course.dateCompleted) : '—' }}</span>
        </div>
      </div>

      <!-- Submission line -->
      <div v-if="course.submission.mode !== 'none'" class="pt-2">
        <!-- Auto submission -->
        <div v-if="course.submission.mode === 'auto'" class="flex items-center space-x-2">
          <UIcon name="i-heroicons-check-badge" class="w-5 h-5 text-green-500" />
          <span class="text-sm text-green-700 font-medium">
            Sent to court
            <span v-if="course.submission.sentAt" class="text-green-600">
              on {{ formatDate(course.submission.sentAt) }}
            </span>
          </span>
        </div>

        <!-- Manual submission -->
        <div v-else-if="course.submission.mode === 'manual'" class="space-y-2">
          <div class="flex items-start space-x-2">
            <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div class="text-sm text-gray-700">
              <div class="font-medium">Not able to auto-submit. You are required to submit.</div>
              <div class="text-gray-600 mt-1">{{ course.submission.instructions }}</div>
              <NuxtLink 
                v-if="course.submission.link" 
                :to="course.submission.link"
                class="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center space-x-1 mt-2"
              >
                <span>View instructions</span>
                <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer actions -->
    <template #footer>
      <div class="flex flex-col sm:flex-row gap-2">
        <!-- Primary action button -->
        <UButton
          v-if="course.status === 'not_started'"
          :to="`/course/${course.slug}`"
          color="primary"
          class="flex-1"
        >
          <UIcon name="i-heroicons-play" class="w-4 h-4 mr-2" />
          Start Course
        </UButton>

        <UButton
          v-else-if="course.status === 'in_progress'"
          :to="`/course/${course.slug}`"
          color="primary"
          class="flex-1"
        >
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 mr-2" />
          Resume Course
        </UButton>

        <UButton
          v-else-if="course.status === 'completed' && course.certificate.available"
          :to="course.certificate.url"
          color="primary"
          class="flex-1"
        >
          <UIcon name="i-heroicons-document-text" class="w-4 h-4 mr-2" />
          View Certificate
        </UButton>

        <!-- Secondary action for completed courses -->
        <UButton
          v-if="course.status === 'completed'"
          :to="`/course/${course.slug}`"
          variant="ghost"
          class="flex-1"
        >
          <UIcon name="i-heroicons-book-open" class="w-4 h-4 mr-2" />
          Open Course
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup>
const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})

// Helper functions
const getStateColor = (status) => {
  return 'gray'
}

const getStatusIcon = (status) => {
  switch (status) {
    case 'not_started':
      return 'i-heroicons-circle-stack'
    case 'in_progress':
      return 'i-heroicons-arrow-path-rounded-square'
    case 'completed':
      return 'i-heroicons-check-circle'
    default:
      return 'i-heroicons-circle'
  }
}

const getStatusIconColor = (status) => {
  switch (status) {
    case 'not_started':
      return 'text-gray-400'
    case 'in_progress':
      return 'text-blue-500'
    case 'completed':
      return 'text-green-500'
    default:
      return 'text-gray-400'
  }
}

const getStatusBadgeColor = (status) => {
  switch (status) {
    case 'not_started':
      return 'gray'
    case 'in_progress':
      return 'blue'
    case 'completed':
      return 'green'
    default:
      return 'gray'
  }
}

const getStatusText = (status, progressPercent) => {
  switch (status) {
    case 'not_started':
      return 'Not started'
    case 'in_progress':
      return `In progress • ${progressPercent}%`
    case 'completed':
      return 'Completed'
    default:
      return 'Unknown'
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '—'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}
</script>
