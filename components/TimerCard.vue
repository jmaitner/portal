<script setup>
const props = defineProps({
  secondsTotal: { type: Number, required: true },
  onFinish: { type: Function, default: () => {} },
  onNext: { type: Function, default: () => {} },
  hasNext: { type: Boolean, default: false }
})

const secondsRemaining = ref(props.secondsTotal)
const isRunning = ref(false)
const isFinished = ref(false)
const interval = ref(null)

const formattedTime = computed(() => {
  const minutes = Math.floor(secondsRemaining.value / 60)
  const seconds = secondsRemaining.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

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

const resetTimer = () => {
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  }
  secondsRemaining.value = props.secondsTotal
  isFinished.value = false
  isRunning.value = false
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
      <div class="flex items-center justify-between">
        <!-- Left: Empty space for balance -->
        <div class="w-16"></div>
        
        <!-- Center: Time Remaining -->
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-900 mb-1" aria-live="polite">
            {{ formattedTime }}
          </div>
          <div class="text-sm text-blue-700 font-medium">
            Time Remaining
          </div>

        </div>
        
        <!-- Right: Next Button -->
        <div class="flex flex-col items-center">
          <UButton
            v-if="hasNext"
            @click="onNext"
            color="primary"
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
              Timer in progress
            </div>
            <div v-else class="text-blue-600 font-medium">
              <UIcon name="i-heroicons-check-circle" class="w-3 h-3 inline mr-1" />
              Ready to continue
            </div>
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

      </div>
      
      <!-- Next Button -->
      <UButton
        v-if="hasNext"
        @click="onNext"
        color="primary"
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
      
      <!-- Status Text -->
      <div v-if="hasNext && !isFinished" class="text-center">
        <div class="text-sm text-gray-600">
          <UIcon name="i-heroicons-clock" class="w-4 h-4 inline mr-1" />
          Timer in progress
        </div>
      </div>
    </div>
  </div>
</template>
