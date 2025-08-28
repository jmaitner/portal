<script setup>
const props = defineProps({
  secondsTotal: {
    type: Number,
    required: true
  },
  onFinish: {
    type: Function,
    default: () => {}
  }
})

const emit = defineEmits(['update:isRunning', 'update:secondsRemaining'])

const secondsRemaining = ref(props.secondsTotal)
const isRunning = ref(false)
const interval = ref(null)

// Format time as mm:ss
const formattedTime = computed(() => {
  const minutes = Math.floor(secondsRemaining.value / 60)
  const seconds = secondsRemaining.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

// Toggle pause/resume
const toggleTimer = () => {
  if (isRunning.value) {
    pauseTimer()
  } else {
    startTimer()
  }
}

// Start the timer
const startTimer = () => {
  if (secondsRemaining.value <= 0) return
  
  isRunning.value = true
  emit('update:isRunning', true)
  
  interval.value = setInterval(() => {
    secondsRemaining.value--
    emit('update:secondsRemaining', secondsRemaining.value)
    
    if (secondsRemaining.value <= 0) {
      pauseTimer()
      props.onFinish()
    }
  }, 1000)
}

// Pause the timer
const pauseTimer = () => {
  isRunning.value = false
  emit('update:isRunning', false)
  
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  }
}

// Reset timer
const resetTimer = () => {
  pauseTimer()
  secondsRemaining.value = props.secondsTotal
  emit('update:secondsRemaining', secondsRemaining.value)
}

// Clean up on unmount
onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value)
  }
})

// Watch for prop changes
watch(() => props.secondsTotal, (newValue) => {
  secondsRemaining.value = newValue
  emit('update:secondsRemaining', newValue)
})

// Expose methods for parent component
defineExpose({
  startTimer,
  pauseTimer,
  resetTimer,
  isRunning: readonly(isRunning),
  secondsRemaining: readonly(secondsRemaining)
})
</script>

<template>
  <div class="flex items-center space-x-3">
    <UButton
      @click="toggleTimer"
      :color="isRunning ? 'gray' : 'blue'"
      variant="outline"
      size="sm"
      :icon="isRunning ? 'i-heroicons-pause' : 'i-heroicons-play'"
      :aria-pressed="isRunning"
      :disabled="secondsRemaining <= 0"
    >
      {{ isRunning ? 'Pause' : 'Resume' }}
    </UButton>
    
    <div class="text-sm text-gray-600" aria-live="polite">
      Time remaining: {{ formattedTime }}
    </div>
  </div>
</template>
