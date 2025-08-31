<script setup>
import modules from '~/static-data/modules/fl-bdi.json'

const props = defineProps({
  currentModuleId: {
    type: String,
    required: true
  },
  currentLessonId: {
    type: String,
    required: true
  }
})

const courseSlug = 'fl-bdi'

// Create roadmap items
const roadmapItems = computed(() => {
  const items = []
  
  // Add modules 1-12
  modules.modules.forEach((module, index) => {
    const moduleNumber = index + 1
    const isCurrent = module.id === props.currentModuleId
    
    // Determine status based on module number and current position
    let status = 'not-started'
    if (moduleNumber === 1) {
      status = isCurrent ? 'in-progress' : 'complete'
    } else if (moduleNumber === 2) {
      status = isCurrent ? 'in-progress' : 'not-started'
    } else {
      status = 'locked'
    }
    
    items.push({
      id: module.id,
      kind: 'module',
      title: module.title,
      status,
      number: moduleNumber,
      lessons: module.lessons
    })
  })
  
  // Add Final Exam (step 13)
  items.push({
    id: 'final-exam',
    kind: 'exam',
    title: 'Final Exam',
    status: 'locked',
    number: 13
  })
  
  // Add Certificate (step 14)
  items.push({
    id: 'certificate',
    kind: 'certificate',
    title: 'Certificate',
    status: 'locked',
    number: 14
  })
  
  return items
})

// Get status icon
const getStatusIcon = (status, kind) => {
  if (status === 'locked') {
    return 'i-heroicons-lock-closed'
  } else if (status === 'complete') {
    return 'i-heroicons-check-circle'
  } else if (status === 'in-progress') {
    return 'i-heroicons-circle'
  } else {
    return 'i-heroicons-circle-stack'
  }
}

// Get status color
const getStatusColor = (status) => {
  if (status === 'locked') return 'text-gray-400'
  if (status === 'complete') return 'text-blue-500'
  if (status === 'in-progress') return 'text-blue-500'
  return 'text-gray-300'
}

// Get route for item
const getItemRoute = (item) => {
  if (item.kind === 'exam') {
    return '/course/fl-bdi/final-exam'
  } else if (item.kind === 'certificate') {
    return '/course/fl-bdi/certificate'
  } else {
    // For modules, route to first lesson
    const firstLesson = item.lessons?.[0]
    if (firstLesson) {
      return `/course/${courseSlug}/learn/${item.id}/${firstLesson.id}`
    }
    return `/course/${courseSlug}/learn/${item.id}/demo`
  }
}

// Check if item is current
const isCurrentItem = (item) => {
  if (item.kind === 'module') {
    return item.id === props.currentModuleId
  }
  return false
}
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-gray-900">Florida Basic Driver Improvement Course</h3>
    <div class="space-y-1">
      <NuxtLink
        v-for="item in roadmapItems"
        :key="item.id"
        :to="getItemRoute(item)"
        class="flex items-center space-x-3 py-3 px-3 rounded-md text-sm transition-colors min-h-[44px]"
        :class="{
          'bg-blue-50 text-blue-700 border-l-2 border-blue-500': isCurrentItem(item),
          'text-gray-600 hover:text-gray-900 hover:bg-gray-50': !isCurrentItem(item) && item.status !== 'locked',
          'text-gray-400 cursor-not-allowed': item.status === 'locked'
        }"
      >
        <!-- Number -->
        <div class="flex-shrink-0 w-6 text-left font-medium text-gray-500">
          {{ item.number }}.
        </div>
        
        <!-- Status Icon -->
        <UIcon 
          :name="getStatusIcon(item.status, item.kind)"
          class="w-4 h-4 flex-shrink-0"
          :class="getStatusColor(item.status)"
        />
        
        <!-- Title -->
        <span class="flex-1">{{ item.title }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
