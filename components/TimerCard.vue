<script setup>
const props = defineProps({
  secondsTotal: { type: Number, required: true },
  onFinish: { type: Function, default: () => {} },
  onNext: { type: Function, default: () => {} },
  onPrevious: { type: Function, default: () => {} },
  onExit: { type: Function, default: () => {} },
  hasNext: { type: Boolean, default: false },
  hasPrevious: { type: Boolean, default: false }
})

const emit = defineEmits(['update:isRunning', 'update:secondsRemaining'])

const secondsRemaining = ref(props.secondsTotal)
const isRunning = ref(false)
const isFinished = ref(false)
const interval = ref(null)

const formattedTime = computed(() => {
  const minutes = Math.floor(secondsRemaining.value / 60)
  const seconds = secondsRemaining.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const toggleTimer = () => {
  if (isRunning.value) {
    pauseTimer()
  } else {
    startTimer()
  }
}

const startTimer = () => {
  if (secondsRemaining.value <= 0) return
  
  isRunning.value = true
  interval.value = setInterval(() => {
    secondsRemaining.value--
    
    if (secondsRemaining.value <= 0) {
      clearInterval(interval.value)
      isRunning.value = false
      isFinished.value = true
      props.onFinish()
    }
  }, 1000)
}

const pauseTimer = () => {
  isRunning.value = false
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  }
}

const resetTimer = () => {
  pauseTimer()
  secondsRemaining.value = props.secondsTotal
  isFinished.value = false
}

const autoStart = () => {
  resetTimer()
  startTimer()
}

// Auto-start when component mounts
onMounted(() => {
  autoStart()
})

// Cleanup on unmount
onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value)
  }
})

// Watch for prop changes and reset
watch(() => props.secondsTotal, (newValue) => {
  secondsRemaining.value = newValue
  autoStart()
})

// Expose methods for parent component
defineExpose({
  startTimer,
  pauseTimer,
  resetTimer,
  autoStart,
  isRunning: readonly(isRunning),
  secondsRemaining: readonly(secondsRemaining),
  isFinished: readonly(isFinished)
})
</script>

<template>
  <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 shadow-lg">
    <!-- Desktop Layout -->
    <div class="hidden lg:block">
      <!-- Top Row -->
      <div class="flex items-center justify-between mb-4">
        <!-- Left: Play/Pause Button -->
        <div class="flex flex-col items-center space-y-3">
          <div class="relative">
            <UButton
              @click="toggleTimer"
              :color="isRunning ? 'gray' : 'primary'"
              variant="solid"
              size="lg"
              :icon="isRunning ? 'i-heroicons-pause' : 'i-heroicons-play'"
              :aria-pressed="isRunning"
              :disabled="secondsRemaining <= 0"
              class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-200"
            >
              {{ isRunning ? 'Pause' : 'Resume' }}
            </UButton>
            <div v-if="isRunning" class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <!-- Exit Button Under Pause -->
          <UButton
            @click="onExit"
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark"
            class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-gray-100 transition-colors"
          >
            Exit
          </UButton>
        </div>
        
        <!-- Center: Time Remaining -->
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-900 mb-1" aria-live="polite">
            {{ formattedTime }}
          </div>
          <div class="text-sm text-blue-700 font-medium">
            Time Remaining
          </div>
          <!-- Progress Bar -->
          <div class="mt-3 w-32 mx-auto">
            <div class="bg-blue-200 rounded-full h-2">
              <div 
                class="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                :style="{ width: `${((props.secondsTotal - secondsRemaining) / props.secondsTotal) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- Right: Next Button -->
        <div class="flex flex-col items-center">
          <UButton
            v-if="hasNext"
            @click="onNext"
            :color="isFinished ? 'primary' : 'gray'"
            variant="solid"
            size="lg"
            icon="i-heroicons-arrow-right"
            icon-right
            :disabled="!isFinished"
            :aria-disabled="!isFinished"
            class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-200"
          >
            Next
          </UButton>
          <div v-else class="w-16 h-10"></div>
          
          <!-- Status Indicator -->
          <div v-if="hasNext" class="mt-2 text-xs text-center">
            <div v-if="!isFinished" class="text-gray-500">
              <UIcon name="i-heroicons-clock" class="w-3 h-3 inline mr-1" />
              Waiting for timer
            </div>
            <div v-else class="text-green-600 font-medium">
              <UIcon name="i-heroicons-check-circle" class="w-3 h-3 inline mr-1" />
              Ready to continue
            </div>
          </div>
        </div>
      </div>
      
      <!-- Helper Text Row -->
      <div class="flex items-center justify-center mt-4">
        <div v-if="hasNext && !isFinished" class="bg-blue-100 border border-blue-200 rounded-lg px-4 py-2">
          <div class="flex items-center space-x-2">
            <UIcon name="i-heroicons-information-circle" class="w-4 h-4 text-blue-600" />
            <span class="text-sm text-blue-800 font-medium">
              Complete the timer to continue
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mobile Layout -->
    <div class="lg:hidden space-y-4">
      <!-- Time Remaining -->
      <div class="text-center">
        <div class="text-xl font-bold text-blue-900 mb-1" aria-live="polite">
          {{ formattedTime }}
        </div>
        <div class="text-sm text-blue-700 font-medium mb-3">
          Time Remaining
        </div>
        <!-- Progress Bar -->
        <div class="w-48 mx-auto">
          <div class="bg-blue-200 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
              :style="{ width: `${((props.secondsTotal - secondsRemaining) / props.secondsTotal) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
      
      <!-- Play/Pause Button -->
      <div class="flex justify-center">
        <div class="relative">
          <UButton
            @click="toggleTimer"
            :color="isRunning ? 'gray' : 'primary'"
            variant="solid"
            size="lg"
            :icon="isRunning ? 'i-heroicons-pause' : 'i-heroicons-play'"
            :aria-pressed="isRunning"
            :disabled="secondsRemaining <= 0"
            class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-200"
          >
            {{ isRunning ? 'Pause' : 'Resume' }}
          </UButton>
          <div v-if="isRunning" class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <!-- Next Button -->
      <UButton
        v-if="hasNext"
        @click="onNext"
        :color="isFinished ? 'primary' : 'gray'"
        variant="solid"
        icon="i-heroicons-arrow-right"
        icon-right
        :disabled="!isFinished"
        :aria-disabled="!isFinished"
        block
        size="lg"
        class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-200"
      >
        {{ isFinished ? 'Continue to Next Lesson' : 'Next (Timer Required)' }}
      </UButton>
      
      <!-- Exit + Helper Text -->
      <div class="flex flex-col items-center space-y-2">
        <UButton
          @click="onExit"
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark"
          class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Exit
        </UButton>
        
        <div v-if="hasNext && !isFinished" class="bg-blue-100 border border-blue-200 rounded-lg px-4 py-2 text-center">
          <div class="flex items-center justify-center space-x-2">
            <UIcon name="i-heroicons-information-circle" class="w-4 h-4 text-blue-600" />
            <span class="text-sm text-blue-800 font-medium">
              Complete the timer to continue
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
