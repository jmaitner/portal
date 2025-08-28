<script setup>
import quizData from '~/static-data/quiz/fl-bdi-m1.json'

const props = defineProps({
  quizId: {
    type: String,
    required: true
  }
})

const questions = quizData.questions
const selectedAnswers = ref({})
const showResults = ref(false)
const correctAnswers = ref(0)

const checkAnswers = () => {
  let correct = 0
  questions.forEach(question => {
    if (selectedAnswers.value[question.id] === question.answerIndex) {
      correct++
    }
  })
  correctAnswers.value = correct
  showResults.value = true
}

const tryAgain = () => {
  selectedAnswers.value = {}
  showResults.value = false
  correctAnswers.value = 0
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
    
    <!-- Action Buttons -->
    <div class="flex space-x-4">
      <UButton
        v-if="!showResults"
        @click="checkAnswers"
        color="primary"
        :disabled="Object.keys(selectedAnswers).length < questions.length"
        class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Check Answers
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
      
      <div v-if="showResults" class="flex items-center space-x-2 text-lg font-medium">
        <span>Score:</span>
        <span class="text-blue-600">{{ correctAnswers }}/{{ questions.length }}</span>
        <span class="text-gray-500">({{ Math.round((correctAnswers / questions.length) * 100) }}%)</span>
      </div>
    </div>
  </div>
</template>
