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
  },
  canNext: {
    type: Boolean,
    default: false
  }
})

const courseSlug = 'fl-bdi'

// Find current lesson and module
const currentModule = modules.modules.find(m => m.id === props.currentModuleId)
const currentLessonIndex = currentModule?.lessons.findIndex(l => l.id === props.currentLessonId) ?? -1

// Navigation helpers
const getPreviousLesson = () => {
  if (currentLessonIndex > 0) {
    return {
      moduleId: props.currentModuleId,
      lessonId: currentModule.lessons[currentLessonIndex - 1].id
    }
  }
  
  // Find previous module's last lesson
  const moduleIndex = modules.modules.findIndex(m => m.id === props.currentModuleId)
  if (moduleIndex > 0) {
    const prevModule = modules.modules[moduleIndex - 1]
    return {
      moduleId: prevModule.id,
      lessonId: prevModule.lessons[prevModule.lessons.length - 1].id
    }
  }
  return null
}

const getNextLesson = () => {
  if (currentLessonIndex < currentModule.lessons.length - 1) {
    return {
      moduleId: props.currentModuleId,
      lessonId: currentModule.lessons[currentLessonIndex + 1].id
    }
  }
  
  // Find next module's first lesson
  const moduleIndex = modules.modules.findIndex(m => m.id === props.currentModuleId)
  if (moduleIndex < modules.modules.length - 1) {
    const nextModule = modules.modules[moduleIndex + 1]
    return {
      moduleId: nextModule.id,
      lessonId: nextModule.lessons[0].id
    }
  }
  return null
}

const previousLesson = getPreviousLesson()
const nextLesson = getNextLesson()
</script>

<template>
  <div class="bg-white border-t border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <UButton
        v-if="previousLesson"
        :to="`/course/${courseSlug}/learn/${previousLesson.moduleId}/${previousLesson.lessonId}`"
        color="gray"
        variant="outline"
        icon="i-heroicons-arrow-left"
      >
        Previous
      </UButton>
      <div v-else></div>
      
      <UButton
        to="/dashboard"
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark"
      >
        Exit
      </UButton>
      
      <UButton
        v-if="nextLesson"
        :to="`/course/${courseSlug}/learn/${nextLesson.moduleId}/${nextLesson.lessonId}`"
        color="primary"
        icon="i-heroicons-arrow-right"
        icon-right
        :disabled="!canNext"
      >
        Next
      </UButton>
      <div v-else></div>
    </div>
    
    <!-- Helper text when Next is disabled -->
    <div v-if="nextLesson && !canNext" class="text-center mt-2">
      <p class="text-sm text-gray-500">Time must finish before 'Next' becomes available</p>
    </div>
  </div>
</template>
