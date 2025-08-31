<script setup>
import courses from '~/static-data/courses.json'
import finalExamQuiz from '~/static-data/quiz/fl-bdi-final.json'

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

const questions = finalExamQuiz.questions
const selectedAnswers = ref({})
const showResults = ref(false)
const correctAnswers = ref(0)
const examPassed = ref(false)

const checkAnswers = () => {
  let correct = 0
  questions.forEach(question => {
    if (selectedAnswers.value[question.id] === question.answerIndex) {
      correct++
    }
  })
  correctAnswers.value = correct
  examPassed.value = correct >= Math.ceil(questions.length * 0.8) // 80% to pass
  showResults.value = true
}

const tryAgain = () => {
  selectedAnswers.value = {}
  showResults.value = false
  correctAnswers.value = 0
  examPassed.value = false
}

const isCorrect = (questionId, choiceIndex) => {
  const question = questions.find(q => q.id === questionId)
  return choiceIndex === question.answerIndex
}

const isSelected = (questionId, choiceIndex) => {
  return selectedAnswers.value[questionId] === choiceIndex
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header with progress -->
    <div class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-lg font-semibold text-gray-900">{{ course.title }}</h1>
          <p class="text-sm text-gray-600">Final Exam</p>
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

    <!-- Main content -->
    <div class="flex">
      <!-- Left sidebar - Module tree -->
      <div class="w-80 bg-white border-r border-gray-200 p-6">
        <ModuleTree 
          current-module-id="final-exam"
          current-lesson-id="exam"
        />
      </div>

      <!-- Right content area -->
      <div class="flex-1">
        <div class="p-8">
          <div class="max-w-4xl mx-auto">
            <!-- Exam title -->
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
                  You passed the final exam with {{ correctAnswers }}/{{ questions.length }} correct answers ({{ Math.round((correctAnswers / questions.length) * 100) }}%).
                </p>
                <p v-else>
                  You need 80% to pass. You scored {{ correctAnswers }}/{{ questions.length }} ({{ Math.round((correctAnswers / questions.length) * 100) }}%).
                </p>
              </template>
            </UAlert>

            <!-- Quiz content -->
            <div class="bg-white rounded-lg border border-gray-200 p-8">
              <div class="space-y-8">
                <div v-for="(question, questionIndex) in questions" :key="question.id" class="space-y-4">
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
                  :disabled="Object.keys(selectedAnswers).length < questions.length"
                >
                  Submit Exam
                </UButton>
                
                <UButton
                  v-if="showResults"
                  @click="tryAgain"
                  color="gray"
                  variant="outline"
                >
                  Try Again
                </UButton>
                
                <UButton
                  v-if="showResults && examPassed"
                  to="/course/fl-bdi/certificate"
                  color="primary"
                >
                  View Certificate
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom toolbar -->
    <div class="bg-white border-t border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <UButton
          to="/course/fl-bdi/learn/m1/l1"
          color="gray"
          variant="outline"
          icon="i-heroicons-arrow-left"
        >
          Back to Course
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
