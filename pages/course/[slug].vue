<script setup>
import courses from '~/static-data/courses.json'
import modules from '~/static-data/modules/fl-bdi.json'
import finalExamQuiz from '~/static-data/quiz/fl-bdi-final.json'

const route = useRoute()
const course = courses

// Validate course slug
if (route.params.slug !== course.slug) {
  throw createError({ statusCode: 404, statusMessage: 'Course not found' })
}

// Current lesson state
const currentModuleId = ref('m1')
const currentLessonId = ref('l1')
const showMobileRail = ref(false)

// Find current module and lesson
const currentModule = computed(() => 
  modules.modules.find(m => m.id === currentModuleId.value)
)
const currentLesson = computed(() => 
  currentModule.value?.lessons.find(l => l.id === currentLessonId.value)
)

// Timer state
const timerRef = ref(null)

// Timer finish callback
const onTimerFinish = () => {
  // Timer finished - Next button will be enabled in TimerCard
}

// Auto-start timer when lesson changes
watch([currentModuleId, currentLessonId], () => {
  if (timerRef.value && currentLesson.value?.type === 'read') {
    // TimerCard will auto-start when mounted
  }
}, { immediate: true })

// Create roadmap items
const roadmapItems = computed(() => {
  const items = []
  
  // Add modules 1-12
  modules.modules.forEach((module, index) => {
    const moduleNumber = index + 1
    const isCurrent = module.id === currentModuleId.value
    
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

// Navigation helpers
const getPreviousLesson = () => {
  if (!currentModule.value || !currentLesson.value) return null
  
  const currentLessonIndex = currentModule.value.lessons.findIndex(l => l.id === currentLesson.value.id)
  
  if (currentLessonIndex > 0) {
    return {
      moduleId: currentModuleId.value,
      lessonId: currentModule.value.lessons[currentLessonIndex - 1].id
    }
  }
  
  // Find previous module's last lesson
  const moduleIndex = modules.modules.findIndex(m => m.id === currentModuleId.value)
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
  if (!currentModule.value || !currentLesson.value) return null
  
  const currentLessonIndex = currentModule.value.lessons.findIndex(l => l.id === currentLesson.value.id)
  
  if (currentLessonIndex < currentModule.value.lessons.length - 1) {
    return {
      moduleId: currentModuleId.value,
      lessonId: currentModule.value.lessons[currentLessonIndex + 1].id
    }
  }
  
  // Find next module's first lesson
  const moduleIndex = modules.modules.findIndex(m => m.id === currentModuleId.value)
  if (moduleIndex < modules.modules.length - 1) {
    const nextModule = modules.modules[moduleIndex + 1]
    return {
      moduleId: nextModule.id,
      lessonId: nextModule.lessons[0].id
    }
  }
  return null
}

const previousLesson = computed(() => getPreviousLesson())
const nextLesson = computed(() => getNextLesson())

// Navigate to lesson
const navigateToLesson = (moduleId, lessonId) => {
  currentModuleId.value = moduleId
  currentLessonId.value = lessonId
  showMobileRail.value = false
}

// Handle roadmap item click
const handleRoadmapClick = (item) => {
  if (item.kind === 'exam') {
    // Navigate to final exam
    navigateToLesson('final-exam', 'exam')
  } else if (item.kind === 'certificate') {
    // Navigate to certificate
    navigateToLesson('certificate', 'cert')
  } else {
    // Navigate to first lesson of module
    const firstLesson = item.lessons?.[0]
    if (firstLesson) {
      navigateToLesson(item.id, firstLesson.id)
    }
  }
}

// Quiz state for final exam
const selectedAnswers = ref({})
const showResults = ref(false)
const correctAnswers = ref(0)
const examPassed = ref(false)

const checkAnswers = () => {
  let correct = 0
  finalExamQuiz.questions.forEach(question => {
    if (selectedAnswers.value[question.id] === question.answerIndex) {
      correct++
    }
  })
  correctAnswers.value = correct
  examPassed.value = correct >= Math.ceil(finalExamQuiz.questions.length * 0.8)
  showResults.value = true
}

const tryAgain = () => {
  selectedAnswers.value = {}
  showResults.value = false
  correctAnswers.value = 0
  examPassed.value = false
}

const isCorrect = (questionId, choiceIndex) => {
  const question = finalExamQuiz.questions.find(q => q.id === questionId)
  return choiceIndex === question.answerIndex
}

const isSelected = (questionId, choiceIndex) => {
  return selectedAnswers.value[questionId] === choiceIndex
}

// Current date for certificate
const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="flex items-center justify-between px-6 py-4">
        <!-- Left: Logo -->
        <div class="flex items-center space-x-3">
          <img src="/branding/logo.svg" alt="Road Ready Safety" class="h-6 w-auto" aria-hidden="true" />
          <span class="text-lg font-semibold text-gray-900">Road Ready Safety</span>
        </div>
        
                            <!-- Middle: Empty space -->
                    <div class="flex-1"></div>
        
        <!-- Right: Progress, Support, Avatar -->
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
            <span class="text-sm font-medium text-blue-700">{{ course.meta.demoProgressPercent }}%</span>
          </div>
          
          <NuxtLink to="/support" class="text-gray-600 hover:text-gray-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
            Support
          </NuxtLink>
          
          <div class="relative">
            <button class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              <UIcon name="i-heroicons-user" class="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex">
                        <!-- Left Rail -->
                  <div class="w-80 bg-white border-r border-gray-200 flex-shrink-0 sticky top-0 h-screen overflow-y-auto lg:block hidden">
        <div class="p-6">
          <!-- Course Title -->
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Florida Basic Driver Improvement Course</h2>
          
                                <!-- Continue Course / Save & Exit CTA -->
                      <UButton 
                        v-if="currentModuleId === 'm1' && currentLessonId === 'l1'"
                        @click="() => navigateTo('/dashboard')"
                        color="gray"
                        variant="outline"
                        size="lg"
                        block
                        class="mb-6"
                        icon="i-heroicons-bookmark"
                      >
                        Save & Exit
                      </UButton>
                      <UButton 
                        v-else
                        @click="navigateToLesson('m1', 'l1')"
                        color="primary"
                        size="lg"
                        block
                        class="mb-6"
                        icon="i-heroicons-play"
                      >
                        Continue Course
                      </UButton>
          
          
          
          <div class="border-t border-gray-200 pt-6">
            <!-- Roadmap -->
            <h3 class="text-sm font-medium text-gray-700 mb-4">Course Progress</h3>
            <div class="space-y-1">
              <button
                v-for="item in roadmapItems"
                :key="item.id"
                @click="handleRoadmapClick(item)"
                class="flex items-center space-x-3 py-3 px-3 rounded-md text-sm transition-colors min-h-[44px] w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                :class="{
                  'bg-blue-50 text-blue-700 border-l-2 border-blue-500': 
                    (item.kind === 'module' && item.id === currentModuleId) ||
                    (item.kind === 'exam' && currentModuleId === 'final-exam') ||
                    (item.kind === 'certificate' && currentModuleId === 'certificate'),
                  'text-gray-600 hover:text-gray-900 hover:bg-gray-50': 
                    !(item.kind === 'module' && item.id === currentModuleId) && item.status !== 'locked',
                  'text-gray-400 cursor-not-allowed': item.status === 'locked'
                }"
              >
                <!-- Number -->
                <div class="flex-shrink-0 w-6 text-left font-medium text-gray-500">
                  {{ item.number }}.
                </div>
                
                <!-- Status Icon -->
                <UIcon 
                  :name="item.status === 'locked' ? 'i-heroicons-lock-closed' : 
                         item.status === 'complete' ? 'i-heroicons-check-circle' : 
                         item.status === 'in-progress' ? 'i-heroicons-circle-stack' : 
                         'i-heroicons-circle-stack'"
                  class="w-4 h-4 flex-shrink-0"
                  :class="item.status === 'locked' ? 'text-gray-400' : 
                         item.status === 'complete' ? 'text-green-500' : 
                         item.status === 'in-progress' ? 'text-blue-500' : 
                         'text-gray-300'"
                />
                
                <!-- Title -->
                <span class="flex-1">{{ item.title }}</span>
                
                <!-- Estimated Time (for modules) -->
                <span v-if="item.kind === 'module'" class="text-xs text-gray-400">
                  {{ item.lessons?.length || 2 }} min
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

                          <!-- Right Content -->
                    <div class="flex-1 min-h-[calc(100vh-64px)] flex flex-col lg:ml-0">
        <!-- Top strip -->
        <div class="bg-white border-b border-gray-200 px-6 py-4 lg:block hidden">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-semibold text-gray-900">
                {{ currentModule?.title || (currentModuleId === 'final-exam' ? 'Final Exam' : 'Certificate') }}
              </h1>
              <p class="text-sm text-gray-600 mt-1">
                {{ currentLesson?.title || (currentModuleId === 'final-exam' ? 'Complete this exam to finish your course' : 'Your certificate of completion') }}
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600">Progress</span>
              <UProgress 
                :value="course.meta.demoProgressPercent" 
                :max="100"
                class="w-32"
                color="primary"
              />
              <span class="text-sm text-gray-600">{{ course.meta.demoProgressPercent }}%</span>
            </div>
          </div>
        </div>

        <!-- Content Area -->
        <div class="p-4 lg:p-8 flex-1">
          <div class="w-full h-full flex flex-col">
            <!-- Final Exam -->
            <div v-if="currentModuleId === 'final-exam'" class="space-y-6">
              <div class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-900 mb-2">Final Exam</h2>
                <p class="text-gray-600">Complete this exam to finish your course. You need 80% to pass.</p>
              </div>

              <!-- Pass/Fail Banner -->
              <UAlert
                v-if="showResults"
                :title="examPassed ? 'Congratulations!' : 'Exam Failed'"
                :color="examPassed ? 'green' : 'red'"
                variant="soft"
                class="mb-6"
              >
                <template #description>
                  <p v-if="examPassed">
                    You passed the final exam with {{ correctAnswers }}/{{ finalExamQuiz.questions.length }} correct answers ({{ Math.round((correctAnswers / finalExamQuiz.questions.length) * 100) }}%).
                  </p>
                  <p v-else>
                    You need 80% to pass. You scored {{ correctAnswers }}/{{ finalExamQuiz.questions.length }} ({{ Math.round((correctAnswers / finalExamQuiz.questions.length) * 100) }}%).
                  </p>
                </template>
              </UAlert>

              <!-- Quiz content -->
              <div class="bg-white rounded-lg border border-gray-200 p-8">
                <div class="space-y-8">
                  <div v-for="(question, questionIndex) in finalExamQuiz.questions" :key="question.id" class="space-y-4">
                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 class="text-lg font-medium text-gray-900 mb-4">
                        Question {{ questionIndex + 1 }}: {{ question.prompt }}
                      </h3>
                      
                      <div class="space-y-3">
                        <label
                          v-for="(choice, choiceIndex) in question.choices"
                          :key="choiceIndex"
                          class="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors"
                          :class="{
                            'border-blue-500 bg-blue-50': isSelected(question.id, choiceIndex) && !showResults,
                            'border-green-500 bg-green-50': showResults && isCorrect(question.id, choiceIndex),
                            'border-red-500 bg-red-50': showResults && isSelected(question.id, choiceIndex) && !isCorrect(question.id, choiceIndex),
                            'border-gray-200 hover:border-gray-300': !isSelected(question.id, choiceIndex) && !showResults
                          }"
                        >
                          <input
                            type="radio"
                            :name="question.id"
                            :value="choiceIndex"
                            v-model="selectedAnswers[question.id]"
                            :disabled="showResults"
                            class="sr-only"
                          />
                          <div class="flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                               :class="{
                                 'border-blue-500': isSelected(question.id, choiceIndex) && !showResults,
                                 'border-green-500 bg-green-500': showResults && isCorrect(question.id, choiceIndex),
                                 'border-red-500 bg-red-500': showResults && isSelected(question.id, choiceIndex) && !isCorrect(question.id, choiceIndex),
                                 'border-gray-300': !isSelected(question.id, choiceIndex) && !showResults
                               }"
                          >
                            <div v-if="isSelected(question.id, choiceIndex) || (showResults && isCorrect(question.id, choiceIndex))" 
                                 class="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                          <span class="text-gray-900">{{ choice }}</span>
                        </label>
                      </div>
                      
                      <!-- Rationale -->
                      <div v-if="showResults" class="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 class="font-medium text-blue-900 mb-2">Explanation:</h4>
                        <p class="text-blue-800">{{ question.rationale }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex space-x-4 mt-8">
                  <UButton
                    v-if="!showResults"
                    @click="checkAnswers"
                    color="primary"
                    :disabled="Object.keys(selectedAnswers).length < finalExamQuiz.questions.length"
                    class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Submit Exam
                  </UButton>
                  
                  <UButton
                    v-if="showResults"
                    @click="tryAgain"
                    color="gray"
                    variant="outline"
                    class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Try Again
                  </UButton>
                  
                                                <UButton
                                v-if="showResults && examPassed"
                                @click="navigateToLesson('certificate', 'cert')"
                                color="primary"
                                class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                View Certificate
                              </UButton>
                </div>
              </div>
            </div>

            <!-- Certificate -->
            <div v-else-if="currentModuleId === 'certificate'" class="space-y-6">
              <div class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-900 mb-2">Course Certificate</h2>
                <p class="text-gray-600">Your certificate of completion for the Florida Basic Driver Improvement course.</p>
              </div>

              <!-- Certificate Preview -->
              <div class="bg-white rounded-lg border border-gray-200 p-8 md:p-10 min-h-[60vh] shadow-sm">
                <div class="text-center space-y-8">
                  <!-- Certificate Header -->
                  <div class="space-y-4">
                    <img src="/branding/logo.svg" alt="Road Ready Safety" class="h-16 w-auto mx-auto" />
                    <h3 class="text-3xl font-bold text-gray-900">Certificate of Completion</h3>
                    <p class="text-gray-600 text-lg">This is to certify that</p>
                  </div>

                  <!-- Student Name -->
                  <div class="py-6">
                    <p class="text-2xl font-semibold text-gray-900 border-b-2 border-gray-300 pb-3">
                      [Student Name]
                    </p>
                  </div>

                  <!-- Course Details -->
                  <div class="space-y-3">
                    <p class="text-gray-600 text-lg">has successfully completed the</p>
                    <p class="text-xl font-semibold text-gray-900">{{ course.title }}</p>
                    <p class="text-gray-600">State: {{ course.state }}</p>
                    <p class="text-gray-600">Duration: {{ course.durationMin }} minutes</p>
                  </div>

                  <!-- Completion Date -->
                  <div class="pt-6">
                    <p class="text-gray-600">Completed on</p>
                    <p class="text-xl font-semibold text-gray-900">{{ currentDate }}</p>
                  </div>

                  <!-- Certificate Number -->
                  <div class="pt-6 border-t border-gray-200">
                    <p class="text-sm text-gray-500">Certificate #: FL-BDI-{{ Date.now().toString().slice(-8) }}</p>
                  </div>

                  <!-- Disclaimer -->
                  <div class="pt-6 text-xs text-gray-500 max-w-md mx-auto">
                    <p>This certificate is issued for educational purposes and satisfies the requirements for Florida Basic Driver Improvement course completion.</p>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex justify-center space-x-4">
                <UButton
                  color="gray"
                  variant="outline"
                  icon="i-heroicons-arrow-left"
                  @click="navigateToLesson('final-exam', 'exam')"
                  class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Back to Exam
                </UButton>
                
                <UButton
                  color="primary"
                  icon="i-heroicons-document-arrow-down"
                  disabled
                  title="Demo only - Download not available"
                  class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Download PDF
                </UButton>
              </div>
            </div>

            <!-- Regular Lesson Content -->
            <div v-else-if="currentLesson" class="space-y-6 flex-1 flex flex-col">
              <!-- Lesson content -->
                                        <div class="bg-white rounded-lg border border-gray-200 p-4 lg:p-8 xl:p-10 flex-1 shadow-sm">
                <LessonRenderer 
                  v-if="currentLesson.type === 'read'"
                  :lesson="currentLesson"
                />
                
                <QuizBlock 
                  v-else-if="currentLesson.type === 'quiz'"
                  :quiz-id="currentLesson.quizId"
                />
              </div>
              
              <!-- TimerCard for read lessons -->
              <ClientOnly v-if="currentLesson.type === 'read'">
                <TimerCard
                  ref="timerRef"
                  :seconds-total="(currentLesson.durationMin || 2) * 60"
                  :on-finish="onTimerFinish"
                  :on-next="() => nextLesson && navigateToLesson(nextLesson.moduleId, nextLesson.lessonId)"
                  :on-exit="() => navigateTo('/dashboard')"
                  :has-next="!!nextLesson"
                  :has-previous="!!previousLesson"
                />
              </ClientOnly>
              
              <!-- SSR fallback for timer -->
              <div v-else-if="currentLesson.type === 'read'" class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div class="flex items-center justify-between">
                  <UButton
                    color="gray"
                    variant="outline"
                    size="sm"
                    icon="i-heroicons-play"
                    disabled
                  >
                    Resume
                  </UButton>
                  <div class="text-lg font-medium text-gray-900">
                    Time remaining: {{ Math.floor((currentLesson.durationMin || 2)) }}:{{ ((currentLesson.durationMin || 2) % 1 * 60).toString().padStart(2, '0') }}
                  </div>
                  <UButton
                    color="primary"
                    icon="i-heroicons-arrow-right"
                    icon-right
                    disabled
                  >
                    Next
                  </UButton>
                </div>
                <div class="flex items-center justify-center mt-4">
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark"
                    disabled
                  >
                    Exit
                  </UButton>
                  <span class="text-sm text-gray-600 ml-4">
                    Time must finish before 'Next' becomes available
                  </span>
                </div>
              </div>
            </div>

            <!-- Empty state for demo modules -->
            <div v-else class="bg-white rounded-lg border border-gray-200 p-4 lg:p-8 xl:p-10 min-h-[60vh] text-center shadow-sm">
              <UIcon name="i-heroicons-document-text" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">Content Coming Soon</h3>
              <p class="text-gray-600">This module is available for demonstration purposes. In a full implementation, it would contain lesson content.</p>
            </div>
          </div>
        </div>


      </div>
    </div>

                    <!-- Mobile Rail Toggle -->
                <div class="lg:hidden fixed bottom-4 right-4 z-50">
                  <UButton
                    @click="showMobileRail = !showMobileRail"
                    color="primary"
                    icon="i-heroicons-bars-3"
                    size="lg"
                    class="rounded-full shadow-lg"
                  />
                </div>

                <!-- Mobile Header with Course Title -->
                <div class="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <img src="/branding/logo.svg" alt="Road Ready Safety" class="h-6 w-auto" />
                      <div>
                        <h1 class="text-lg font-semibold text-gray-900">Florida Basic Driver Improvement</h1>
                        <p class="text-sm text-gray-600">Course Progress</p>
                      </div>
                    </div>
                    <UButton
                      @click="showMobileRail = !showMobileRail"
                      color="gray"
                      variant="ghost"
                      icon="i-heroicons-bars-3"
                      size="sm"
                      class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    />
                  </div>
                </div>

    <!-- Mobile Rail Overlay -->
    <div v-if="showMobileRail" class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" @click="showMobileRail = false">
      <div class="absolute right-0 top-0 h-full w-80 bg-white shadow-xl" @click.stop>
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Modules</h3>
            <UButton
              @click="showMobileRail = false"
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark"
              size="sm"
            />
          </div>
          
          <!-- Mobile roadmap -->
          <div class="space-y-1">
            <button
              v-for="item in roadmapItems"
              :key="item.id"
              @click="handleRoadmapClick(item)"
              class="flex items-center space-x-3 py-3 px-3 rounded-md text-sm transition-colors min-h-[44px] w-full text-left"
              :class="{
                'bg-blue-50 text-blue-700 border-l-2 border-blue-500': 
                  (item.kind === 'module' && item.id === currentModuleId) ||
                  (item.kind === 'exam' && currentModuleId === 'final-exam') ||
                  (item.kind === 'certificate' && currentModuleId === 'certificate'),
                'text-gray-600 hover:text-gray-900 hover:bg-gray-50': 
                  !(item.kind === 'module' && item.id === currentModuleId) && item.status !== 'locked',
                'text-gray-400 cursor-not-allowed': item.status === 'locked'
              }"
            >
              <div class="flex-shrink-0 w-6 text-left font-medium text-gray-500">
                {{ item.number }}.
              </div>
              
              <UIcon 
                :name="item.status === 'locked' ? 'i-heroicons-lock-closed' : 
                       item.status === 'complete' ? 'i-heroicons-check-circle' : 
                       item.status === 'in-progress' ? 'i-heroicons-circle-stack' : 
                       'i-heroicons-circle-stack'"
                class="w-4 h-4 flex-shrink-0"
                :class="item.status === 'locked' ? 'text-gray-400' : 
                       item.status === 'complete' ? 'text-green-500' : 
                       item.status === 'in-progress' ? 'text-blue-500' : 
                       'text-gray-300'"
              />
              
              <span class="flex-1">{{ item.title }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
