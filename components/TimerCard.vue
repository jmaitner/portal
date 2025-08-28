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
  <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
    <!-- Desktop Layout -->
    <div class="hidden lg:block">
      <!-- Top Row -->
      <div class="flex items-center justify-between mb-4">
        <!-- Left: Play/Pause Button -->
        <UButton
          @click="toggleTimer"
          :color="isRunning ? 'gray' : 'primary'"
          variant="outline"
          size="sm"
          :icon="isRunning ? 'i-heroicons-pause' : 'i-heroicons-play'"
          :aria-pressed="isRunning"
          :disabled="secondsRemaining <= 0"
          class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {{ isRunning ? 'Pause' : 'Resume' }}
        </UButton>
        
        <!-- Center: Time Remaining -->
        <div class="text-lg font-medium text-gray-900" aria-live="polite">
          Time remaining: {{ formattedTime }}
        </div>
        
        <!-- Right: Next Button -->
        <UButton
          v-if="hasNext"
          @click="onNext"
          color="primary"
          icon="i-heroicons-arrow-right"
          icon-right
          :disabled="!isFinished"
          :aria-disabled="!isFinished"
          class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </UButton>
        <div v-else class="w-16"></div>
      </div>
      
      <!-- Bottom Row -->
      <div class="flex items-center justify-center space-x-4">
        <UButton
          @click="onExit"
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark"
          class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Exit
        </UButton>
        
        <!-- Helper Text -->
        <span v-if="hasNext && !isFinished" class="text-sm text-gray-600">
          Time must finish before 'Next' becomes available
        </span>
      </div>
    </div>
    
    <!-- Mobile Layout -->
    <div class="lg:hidden space-y-4">
      <!-- Time Remaining -->
      <div class="text-center">
        <div class="text-lg font-medium text-gray-900" aria-live="polite">
          Time remaining: {{ formattedTime }}
        </div>
      </div>
      
      <!-- Play/Pause Button -->
      <div class="flex justify-center">
        <UButton
          @click="toggleTimer"
          :color="isRunning ? 'gray' : 'primary'"
          variant="outline"
          size="sm"
          :icon="isRunning ? 'i-heroicons-pause' : 'i-heroicons-play'"
          :aria-pressed="isRunning"
          :disabled="secondsRemaining <= 0"
          class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {{ isRunning ? 'Pause' : 'Resume' }}
        </UButton>
      </div>
      
      <!-- Next Button -->
      <UButton
        v-if="hasNext"
        @click="onNext"
        color="primary"
        icon="i-heroicons-arrow-right"
        icon-right
        :disabled="!isFinished"
        :aria-disabled="!isFinished"
        block
        class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Next
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
        
        <span v-if="hasNext && !isFinished" class="text-sm text-gray-600 text-center">
          Time must finish before 'Next' becomes available
        </span>
      </div>
    </div>
  </div>
</template>
