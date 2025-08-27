<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header -->
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-container mx-auto px-6 h-16 flex items-center justify-between">
        <!-- Left: Brand -->
        <div class="flex items-center space-x-3">
          <img src="/logo.svg" alt="Road Ready Safety" class="h-8 w-auto" />
          <span class="text-lg font-semibold text-slate-900">Road Ready Safety</span>
        </div>
        
        <!-- Right: Navigation -->
        <nav class="flex items-center space-x-6">
          <NuxtLink 
            to="/dashboard" 
            class="text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            Dashboard
          </NuxtLink>
          <UButton 
            variant="solid" 
            color="blue"
            class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log out
          </UButton>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <div v-if="pending" class="flex justify-center items-center py-12">
        <div class="text-slate-600">Loading course...</div>
      </div>
      
      <div v-else-if="error" class="max-w-container mx-auto px-6 py-8">
        <UCard>
          <div class="text-center">
            <h2 class="text-xl font-semibold text-slate-900 mb-2">Course Not Found</h2>
            <p class="text-slate-600 mb-4">The course you're looking for doesn't exist.</p>
            <UButton to="/dashboard" variant="solid" color="blue">
              Return to Dashboard
            </UButton>
          </div>
        </UCard>
      </div>
      
      <div v-else class="max-w-container mx-auto px-6 py-8">
        <!-- Course Progress Header -->
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h1 class="text-2xl font-bold text-slate-900">{{ courseDataComputed?.course?.title }}</h1>
              <p class="text-slate-600 mt-1">{{ currentModule?.title }}</p>
            </div>
            <div class="text-right">
              <div class="text-sm text-slate-600">Progress</div>
              <div class="text-lg font-semibold text-blue-600">{{ progressPercent }}%</div>
            </div>
          </div>
          <UProgress 
            :value="progressPercent" 
            :color="progressPercent === 100 ? 'green' : 'blue'"
            size="lg"
          />
        </div>

        <!-- Course Player Layout -->
        <div class="grid lg:grid-cols-[320px_1fr] gap-8">
          <!-- Left Sidebar: Module Overview -->
          <div class="lg:block">
            <UCard class="h-fit">
              <template #header>
                <h2 class="text-lg font-semibold text-slate-900">Course Modules</h2>
              </template>
              
              <nav class="space-y-2" role="navigation" aria-label="Course modules">
                <div 
                  v-for="module in courseDataComputed?.modules" 
                  :key="module.id"
                  class="space-y-1"
                >
                  <div class="font-medium text-slate-900 text-sm">{{ module.title }}</div>
                  <div class="space-y-1 ml-4">
                    <button
                      v-for="lesson in module.lessons"
                      :key="lesson.id"
                      @click="navigateToLesson(module.id, lesson.id)"
                      :class="[
                        'w-full text-left px-3 py-2 rounded text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                        isCurrentLesson(module.id, lesson.id)
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : isLessonCompleted(module.id, lesson.id)
                          ? 'text-green-700 hover:bg-green-50'
                          : isLessonLocked(module.id, lesson.id)
                          ? 'text-slate-400 cursor-not-allowed'
                          : 'text-slate-700 hover:bg-slate-50'
                      ]"
                      :disabled="isLessonLocked(module.id, lesson.id)"
                    >
                      <div class="flex items-center justify-between">
                        <span>{{ lesson.title }}</span>
                        <div class="flex items-center space-x-1">
                          <UIcon 
                            v-if="isLessonCompleted(module.id, lesson.id)"
                            name="i-heroicons-check-circle" 
                            class="w-4 h-4 text-green-600"
                          />
                          <UIcon 
                            v-else-if="isLessonLocked(module.id, lesson.id)"
                            name="i-heroicons-lock-closed" 
                            class="w-4 h-4 text-slate-400"
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </nav>
            </UCard>
          </div>

          <!-- Right Content Panel -->
          <div class="space-y-6">
            <!-- Lesson Content -->
            <UCard>
              <template #header>
                <h3 class="text-xl font-semibold text-slate-900">{{ currentLesson?.title }}</h3>
              </template>
              
              <div class="min-h-[400px]">
                <!-- Read Lesson -->
                <div v-if="currentLesson?.type === 'read'" class="space-y-6">
                  <div v-for="(block, index) in currentLesson.content" :key="index">
                    <div v-if="block.type === 'heading'" class="text-lg font-semibold text-slate-900">
                      {{ block.text }}
                    </div>
                    <div v-else-if="block.type === 'paragraph'" class="text-slate-700 leading-relaxed">
                      {{ block.text }}
                    </div>
                    <div v-else-if="block.type === 'list'" class="space-y-2">
                      <div v-for="(item, itemIndex) in block.items" :key="itemIndex" class="flex items-start space-x-2">
                        <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span class="text-slate-700">{{ item }}</span>
                      </div>
                    </div>
                    <div v-else-if="block.type === 'note'" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div class="flex items-start space-x-2">
                        <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div class="text-blue-800">{{ block.text }}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="pt-6 border-t border-slate-200">
                    <UButton 
                      v-if="!isLessonCompleted(currentModuleId, currentLessonId)"
                      @click="markAsRead"
                      variant="solid" 
                      color="blue"
                      size="lg"
                    >
                      Mark as Read
                    </UButton>
                    <div v-else class="flex items-center space-x-2 text-green-700">
                      <UIcon name="i-heroicons-check-circle" class="w-5 h-5" />
                      <span class="font-medium">Completed</span>
                    </div>
                  </div>
                </div>

                <!-- Quiz Lesson -->
                <div v-else-if="currentLesson?.type === 'quiz'" class="space-y-6">
                  <QuizRenderer 
                    :quiz="currentLesson.quiz"
                    :course-id="courseDataComputed?.course?.id"
                    @completed="onQuizCompleted"
                  />
                </div>

                <!-- Video Lesson (Placeholder) -->
                <div v-else-if="currentLesson?.type === 'video'" class="text-center py-12">
                  <UIcon name="i-heroicons-video-camera" class="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 class="text-lg font-semibold text-slate-900 mb-2">Video Content</h3>
                  <p class="text-slate-600 mb-6">This course does not require video playback.</p>
                  <UButton 
                    v-if="!isLessonCompleted(currentModuleId, currentLessonId)"
                    @click="markAsRead"
                    variant="solid" 
                    color="blue"
                  >
                    Mark as Read
                  </UButton>
                </div>
              </div>
            </UCard>

            <!-- Navigation Toolbar -->
            <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div class="flex items-center justify-between">
                <UButton 
                  @click="navigatePrevious"
                  :disabled="!canNavigatePrevious"
                  variant="outline"
                  color="gray"
                >
                  <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
                  Previous
                </UButton>
                
                <div class="flex items-center space-x-4">
                  <UButton 
                    @click="saveAndExit"
                    variant="outline"
                    color="gray"
                  >
                    Save & Exit
                  </UButton>
                  
                  <UButton 
                    @click="navigateNext"
                    :disabled="!canNavigateNext"
                    variant="solid"
                    color="blue"
                  >
                    Next
                    <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2" />
                  </UButton>
                </div>
              </div>
              
              <!-- Helper text for locked lessons -->
              <div v-if="!canNavigateNext && !isLessonCompleted(currentModuleId, currentLessonId)" class="mt-3 text-center">
                <p class="text-sm text-slate-600">
                  Complete the required quiz to continue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Global UI Providers -->
    <UNotifications />
    <UModals />
  </div>
</template>

<script setup>
// Route parameters
const route = useRoute()
const router = useRouter()

const courseSlug = route.params.slug
const currentModuleId = route.params.moduleId
const currentLessonId = route.params.lessonId

// Course data
const { data: courseData, pending, error } = await useFetch('/data.json', {
  default: () => ({ courses: [], modulesByCourse: {}, quizzes: [] }),
  server: false,
  key: 'course-data'
})

// Find course and modules
const course = computed(() => 
  courseData.value?.courses?.find(c => c.slug === courseSlug)
)

const modules = computed(() => 
  courseData.value?.modulesByCourse?.[course.value?.id]?.modules || []
)

const courseDataComputed = computed(() => ({
  course: course.value,
  modules: modules.value,
  meta: courseData.value?.modulesByCourse?.[course.value?.id]?.meta || {
    firstModuleId: 'm1',
    firstLessonId: 'l1'
  }
}))

// Progress management
const progress = ref({
  completed: [],
  seatTime: 0,
  last: null
})

// Load progress from localStorage
const loadProgress = () => {
  if (process.client) {
    const stored = localStorage.getItem(`rrs.progress.${courseDataComputed.value?.course?.id}`)
    if (stored) {
      progress.value = JSON.parse(stored)
    }
  }
}

// Save progress to localStorage
const saveProgress = () => {
  if (process.client && courseDataComputed.value?.course?.id) {
    localStorage.setItem(`rrs.progress.${courseDataComputed.value.course.id}`, JSON.stringify(progress.value))
  }
}

// Computed values
const currentModule = computed(() => 
  courseDataComputed.value?.modules?.find(m => m.id === currentModuleId)
)

const currentLesson = computed(() => 
  currentModule.value?.lessons?.find(l => l.id === currentLessonId)
)

const progressPercent = computed(() => {
  if (!courseDataComputed.value?.modules) return 0
  const totalLessons = courseDataComputed.value.modules.reduce((total, module) => 
    total + module.lessons.length, 0
  )
  return totalLessons > 0 ? Math.round((progress.value.completed.length / totalLessons) * 100) : 0
})

// Navigation helpers
const isCurrentLesson = (moduleId, lessonId) => 
  moduleId === currentModuleId && lessonId === currentLessonId

const isLessonCompleted = (moduleId, lessonId) => 
  progress.value.completed.includes(`${moduleId}:${lessonId}`)

const isLessonLocked = (moduleId, lessonId) => {
  // Find the lesson index in its module
  const module = courseDataComputed.value?.modules?.find(m => m.id === moduleId)
  if (!module) return false
  
  const lessonIndex = module.lessons.findIndex(l => l.id === lessonId)
  if (lessonIndex <= 0) return false
  
  // Check if previous lesson is a quiz that hasn't been passed
  const previousLesson = module.lessons[lessonIndex - 1]
  if (previousLesson?.type === 'quiz' && !isLessonCompleted(moduleId, previousLesson.id)) {
    return true
  }
  
  return false
}

const canNavigatePrevious = computed(() => {
  if (!courseDataComputed.value?.modules) return false
  
  const currentModuleIndex = courseDataComputed.value.modules.findIndex(m => m.id === currentModuleId)
  const currentLessonIndex = currentModule.value?.lessons.findIndex(l => l.id === currentLessonId) || 0
  
  return currentModuleIndex > 0 || currentLessonIndex > 0
})

const canNavigateNext = computed(() => {
  if (!currentLesson.value) return false
  
  // For read lessons, must be completed
  if (currentLesson.value.type === 'read' || currentLesson.value.type === 'video') {
    return isLessonCompleted(currentModuleId, currentLessonId)
  }
  
  // For quiz lessons, must be completed
  if (currentLesson.value.type === 'quiz') {
    return isLessonCompleted(currentModuleId, currentLessonId)
  }
  
  return false
})

// Navigation methods
const navigateToLesson = (moduleId, lessonId) => {
  if (isLessonLocked(moduleId, lessonId)) {
    useToast().add({
      title: 'Lesson Locked',
      description: 'Complete the required quiz to access this lesson.',
      color: 'yellow'
    })
    return
  }
  
  router.push(`/course/${courseSlug}/learn/${moduleId}/${lessonId}`)
}

const navigatePrevious = () => {
  if (!courseDataComputed.value?.modules) return
  
  const currentModuleIndex = courseDataComputed.value.modules.findIndex(m => m.id === currentModuleId)
  const currentLessonIndex = currentModule.value?.lessons.findIndex(l => l.id === currentLessonId) || 0
  
  let targetModuleId, targetLessonId
  
  if (currentLessonIndex > 0) {
    // Previous lesson in same module
    targetModuleId = currentModuleId
    targetLessonId = currentModule.value.lessons[currentLessonIndex - 1].id
  } else if (currentModuleIndex > 0) {
    // Last lesson of previous module
    const previousModule = courseDataComputed.value.modules[currentModuleIndex - 1]
    targetModuleId = previousModule.id
    targetLessonId = previousModule.lessons[previousModule.lessons.length - 1].id
  } else {
    return
  }
  
  router.push(`/course/${courseSlug}/learn/${targetModuleId}/${targetLessonId}`)
}

const navigateNext = () => {
  if (!courseDataComputed.value?.modules) return
  
  const currentModuleIndex = courseDataComputed.value.modules.findIndex(m => m.id === currentModuleId)
  const currentLessonIndex = currentModule.value?.lessons.findIndex(l => l.id === currentLessonId) || 0
  
  let targetModuleId, targetLessonId
  
  if (currentLessonIndex < currentModule.value.lessons.length - 1) {
    // Next lesson in same module
    targetModuleId = currentModuleId
    targetLessonId = currentModule.value.lessons[currentLessonIndex + 1].id
  } else if (currentModuleIndex < courseDataComputed.value.modules.length - 1) {
    // First lesson of next module
    const nextModule = courseDataComputed.value.modules[currentModuleIndex + 1]
    targetModuleId = nextModule.id
    targetLessonId = nextModule.lessons[0].id
  } else {
    // Course completed
    useToast().add({
      title: 'Course Completed!',
      description: 'Congratulations on completing the course.',
      color: 'green'
    })
    router.push('/dashboard')
    return
  }
  
  router.push(`/course/${courseSlug}/learn/${targetModuleId}/${targetLessonId}`)
}

const saveAndExit = () => {
  saveProgress()
  router.push('/dashboard')
}

// Lesson completion methods
const markAsRead = () => {
  const lessonKey = `${currentModuleId}:${currentLessonId}`
  if (!progress.value.completed.includes(lessonKey)) {
    progress.value.completed.push(lessonKey)
  }
  progress.value.last = { moduleId: currentModuleId, lessonId: currentLessonId }
  saveProgress()
  
  useToast().add({
    title: 'Lesson Completed',
    description: 'You can now proceed to the next lesson.',
    color: 'green'
  })
}

const onQuizCompleted = (passed) => {
  if (passed) {
    const lessonKey = `${currentModuleId}:${currentLessonId}`
    if (!progress.value.completed.includes(lessonKey)) {
      progress.value.completed.push(lessonKey)
    }
    progress.value.last = { moduleId: currentModuleId, lessonId: currentLessonId }
    saveProgress()
  }
}

// Route validation and redirection
const validateRoute = () => {
  if (!courseDataComputed.value?.modules) return
  
  // Check if module exists
  const moduleExists = courseDataComputed.value.modules.some(m => m.id === currentModuleId)
  if (!moduleExists) {
    redirectToValidLesson()
    return
  }
  
  // Check if lesson exists in module
  const module = courseDataComputed.value.modules.find(m => m.id === currentModuleId)
  const lessonExists = module.lessons.some(l => l.id === currentLessonId)
  if (!lessonExists) {
    redirectToValidLesson()
    return
  }
}

const redirectToValidLesson = () => {
  const firstModule = courseDataComputed.value.modules[0]
  const firstLesson = firstModule.lessons[0]
  
  useToast().add({
    title: 'Invalid Lesson',
    description: 'We brought you to the start of your course.',
    color: 'yellow'
  })
  
  router.replace(`/course/${courseSlug}/learn/${firstModule.id}/${firstLesson.id}`)
}

// Lifecycle
onMounted(() => {
  loadProgress()
})

watch(courseDataComputed, () => {
  if (courseDataComputed.value?.course) {
    validateRoute()
    loadProgress()
  }
})

watch(route, () => {
  // Update progress.last on route change
  if (courseDataComputed.value?.course?.id) {
    progress.value.last = { moduleId: currentModuleId, lessonId: currentLessonId }
    saveProgress()
  }
})

// Auto-save every 30 seconds
let autoSaveInterval
onMounted(() => {
  autoSaveInterval = setInterval(saveProgress, 30000)
})

onUnmounted(() => {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval)
  }
})
</script>
