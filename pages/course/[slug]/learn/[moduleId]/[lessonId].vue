<script setup>
import courses from '~/static-data/courses.json'
import modules from '~/static-data/modules/fl-bdi.json'

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

const moduleId = route.params.moduleId
const lessonId = route.params.lessonId

// Find current module and lesson
const currentModule = modules.modules.find(m => m.id === moduleId)
const currentLesson = currentModule?.lessons.find(l => l.id === lessonId)

if (!currentModule || !currentLesson) {
  throw createError({ statusCode: 404, statusMessage: 'Lesson not found' })
}

// Timer state
const timerRef = ref(null)
const canNext = ref(false)
const isTimerRunning = ref(false)
const secondsRemaining = ref(currentLesson.durationMin * 60)

// Timer finish callback
const onTimerFinish = () => {
  canNext.value = true
}

// Reset timer when lesson changes
watch(() => route.fullPath, () => {
  if (timerRef.value) {
    timerRef.value.resetTimer()
    canNext.value = false
  }
}, { immediate: true })

// Ensure we're in a client context for reactive data
const selectedAnswers = ref({})
const showResults = ref(false)
</script>

<template>
  <div>
    <!-- Header with progress -->
    <div class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-lg font-semibold text-gray-900">{{ course.title }}</h1>
          <p class="text-sm text-gray-600">{{ currentModule.title }}</p>
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
          :current-module-id="moduleId"
          :current-lesson-id="lessonId"
        />
      </div>

      <!-- Right content area -->
      <div class="flex-1">
        <div class="p-8">
          <div class="max-w-4xl mx-auto">
            <!-- Lesson title -->
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">{{ currentLesson.title }}</h2>

            <!-- Lesson content -->
            <div class="bg-white rounded-lg border border-gray-200 p-8">
              <LessonRenderer 
                v-if="currentLesson.type === 'read'"
                :lesson="currentLesson"
              />
              
              <QuizBlock 
                v-else-if="currentLesson.type === 'quiz'"
                :quiz-id="currentLesson.quizId"
              />
            </div>
            
            <!-- Timer for read lessons -->
            <ClientOnly v-if="currentLesson.type === 'read'">
              <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <TimerBlock
                  ref="timerRef"
                  :seconds-total="currentLesson.durationMin * 60"
                  :on-finish="onTimerFinish"
                />
              </div>
            </ClientOnly>
            
            <!-- SSR fallback for timer -->
            <div v-else-if="currentLesson.type === 'read'" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div class="flex items-center space-x-3">
                <UButton
                  color="gray"
                  variant="outline"
                  size="sm"
                  icon="i-heroicons-play"
                  disabled
                >
                  Resume
                </UButton>
                <div class="text-sm text-gray-600">
                  Time remaining: {{ Math.floor(currentLesson.durationMin) }}:{{ (currentLesson.durationMin % 1 * 60).toString().padStart(2, '0') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom toolbar -->
    <PlayerToolbar 
      :current-module-id="moduleId"
      :current-lesson-id="lessonId"
      :can-next="canNext"
    />
  </div>
</template>
