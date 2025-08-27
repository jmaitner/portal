<template>
  <div class="space-y-6">
    <!-- Quiz Instructions -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div class="flex items-start space-x-2">
        <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div class="text-blue-800">
          <p class="font-medium">Quiz Instructions</p>
          <p class="text-sm mt-1">Answer all questions to proceed. You must score at least 80% to pass.</p>
        </div>
      </div>
    </div>

    <!-- Quiz Progress -->
    <div class="flex items-center justify-between">
      <div class="text-sm text-slate-600">
        Question {{ currentQuestionIndex + 1 }} of {{ quiz.questions.length }}
      </div>
      <div class="text-sm text-slate-600">
        {{ answeredQuestions.length }} answered
      </div>
    </div>

    <!-- Question Stepper -->
    <div v-if="!quizSubmitted" class="space-y-6">
      <!-- Current Question -->
      <div class="bg-white border border-slate-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-slate-900 mb-4">
          {{ currentQuestion.question }}
        </h3>
        
        <div class="space-y-3">
          <label
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :class="[
              'flex items-center p-4 border rounded-lg cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              selectedAnswer === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 hover:border-slate-300'
            ]"
          >
            <input
              type="radio"
              :name="`question-${currentQuestionIndex}`"
              :value="index"
              v-model="selectedAnswer"
              class="sr-only"
            />
            <div class="flex items-center space-x-3">
              <div 
                :class="[
                  'w-4 h-4 border-2 rounded-full flex-shrink-0',
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-slate-300'
                ]"
              >
                <div v-if="selectedAnswer === index" class="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
              </div>
              <span class="text-slate-700">{{ option }}</span>
            </div>
          </label>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex items-center justify-between">
        <UButton 
          @click="previousQuestion"
          :disabled="currentQuestionIndex === 0"
          variant="outline"
          color="gray"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
          Previous
        </UButton>
        
        <div class="flex items-center space-x-4">
          <UButton 
            v-if="currentQuestionIndex < quiz.questions.length - 1"
            @click="nextQuestion"
            :disabled="selectedAnswer === null"
            variant="solid"
            color="blue"
          >
            Next Question
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2" />
          </UButton>
          
          <UButton 
            v-else
            @click="submitQuiz"
            :disabled="selectedAnswer === null || !allQuestionsAnswered"
            variant="solid"
            color="green"
          >
            Submit Quiz
            <UIcon name="i-heroicons-check" class="w-4 h-4 ml-2" />
          </UButton>
        </div>
      </div>
    </div>

    <!-- Quiz Results -->
    <div v-else class="space-y-6">
      <!-- Results Summary -->
      <div class="bg-white border border-slate-200 rounded-lg p-6">
        <div class="text-center mb-6">
          <div 
            :class="[
              'w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center',
              quizPassed ? 'bg-green-100' : 'bg-red-100'
            ]"
          >
            <UIcon 
              :name="quizPassed ? 'i-heroicons-check' : 'i-heroicons-x-mark'"
              :class="[
                'w-8 h-8',
                quizPassed ? 'text-green-600' : 'text-red-600'
              ]"
            />
          </div>
          
          <h3 
            :class="[
              'text-xl font-semibold mb-2',
              quizPassed ? 'text-green-700' : 'text-red-700'
            ]"
          >
            {{ quizPassed ? 'Quiz Passed!' : 'Quiz Failed' }}
          </h3>
          
          <p class="text-slate-600">
            You scored {{ quizResults.correct }} out of {{ quizResults.total }} ({{ quizResults.percentage }}%)
          </p>
          
          <p v-if="!quizPassed" class="text-sm text-slate-500 mt-2">
            You need at least 80% to pass. Please try again.
          </p>
        </div>
      </div>

      <!-- Question Review -->
      <div class="space-y-4">
        <h4 class="text-lg font-semibold text-slate-900">Question Review</h4>
        
        <div 
          v-for="(question, index) in quiz.questions"
          :key="index"
          class="bg-white border border-slate-200 rounded-lg p-4"
        >
          <div class="flex items-start space-x-3">
            <div 
              :class="[
                'w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5',
                questionResults[index]?.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              ]"
            >
              <UIcon 
                :name="questionResults[index]?.correct ? 'i-heroicons-check' : 'i-heroicons-x-mark'"
                class="w-4 h-4"
              />
            </div>
            
            <div class="flex-1">
              <p class="font-medium text-slate-900 mb-2">{{ question.question }}</p>
              
              <div class="space-y-1">
                <div 
                  v-for="(option, optionIndex) in question.options"
                  :key="optionIndex"
                  :class="[
                    'text-sm p-2 rounded',
                    optionIndex === question.correctAnswer
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : optionIndex === userAnswers[index] && optionIndex !== question.correctAnswer
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'text-slate-600'
                  ]"
                >
                  {{ option }}
                  <span v-if="optionIndex === question.correctAnswer" class="ml-2 text-xs font-medium">
                    (Correct)
                  </span>
                  <span v-if="optionIndex === userAnswers[index] && optionIndex !== question.correctAnswer" class="ml-2 text-xs font-medium">
                    (Your answer)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-center space-x-4">
        <UButton 
          v-if="!quizPassed"
          @click="retryQuiz"
          variant="solid"
          color="blue"
        >
          Try Again
        </UButton>
        
        <UButton 
          v-if="quizPassed"
          @click="completeQuiz"
          variant="solid"
          color="green"
        >
          Continue
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2" />
        </UButton>
      </div>
    </div>

    <!-- Live region for screen readers -->
    <div aria-live="polite" class="sr-only">
      <span v-if="quizSubmitted">
        {{ quizPassed ? 'Quiz passed' : 'Quiz failed' }}. 
        You scored {{ quizResults.correct }} out of {{ quizResults.total }} questions.
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  quiz: {
    type: Object,
    required: true
  },
  courseId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['completed'])

// Quiz state
const currentQuestionIndex = ref(0)
const selectedAnswer = ref(null)
const userAnswers = ref([])
const quizSubmitted = ref(false)
const quizResults = ref(null)
const quizPassed = ref(false)
const questionResults = ref([])

// Computed values
const currentQuestion = computed(() => 
  props.quiz.questions[currentQuestionIndex.value]
)

const answeredQuestions = computed(() => 
  userAnswers.value.filter(answer => answer !== null && answer !== undefined)
)

const allQuestionsAnswered = computed(() => 
  userAnswers.value.length === props.quiz.questions.length && 
  userAnswers.value.every(answer => answer !== null && answer !== undefined)
)

// Methods
const nextQuestion = () => {
  if (selectedAnswer.value !== null) {
    userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value
    
    if (currentQuestionIndex.value < props.quiz.questions.length - 1) {
      currentQuestionIndex.value++
      selectedAnswer.value = userAnswers.value[currentQuestionIndex.value] ?? null
    }
  }
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value
    currentQuestionIndex.value--
    selectedAnswer.value = userAnswers.value[currentQuestionIndex.value] ?? null
  }
}

const submitQuiz = async () => {
  // Save the last answer
  userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value
  
  try {
    // Load course data to get pass percentage
    const { data: courseData } = await useFetch('/data.json', {
      default: () => ({ courses: [] }),
      server: false
    })
    
    const course = courseData.value?.courses?.find(c => c.id === props.courseId)
    if (!course) {
      throw new Error('Course not found')
    }
    
    // Grade the quiz locally
    let correct = 0
    const total = props.quiz.questions.length
    
    props.quiz.questions.forEach((question, index) => {
      if (userAnswers.value[index] === question.correctAnswer) {
        correct++
      }
    })
    
    const percentage = (correct / total) * 100
    const passed = percentage >= course.passPercent
    
    quizResults.value = {
      correct,
      total,
      passed,
      percentage: Math.round(percentage)
    }
    quizPassed.value = passed
    
    // Calculate question results
    questionResults.value = props.quiz.questions.map((question, index) => ({
      correct: userAnswers.value[index] === question.correctAnswer
    }))
    
    quizSubmitted.value = true
    
    // Emit completion event
    emit('completed', passed)
    
  } catch (error) {
    useToast().add({
      title: 'Error',
      description: 'Failed to submit quiz. Please try again.',
      color: 'red'
    })
  }
}

const retryQuiz = () => {
  // Reset quiz state
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  userAnswers.value = []
  quizSubmitted.value = false
  quizResults.value = null
  quizPassed.value = false
  questionResults.value = []
}

const completeQuiz = () => {
  // Quiz is already completed, just emit the event
  emit('completed', true)
}

// Initialize user answers array
onMounted(() => {
  userAnswers.value = new Array(props.quiz.questions.length).fill(null)
})
</script>
