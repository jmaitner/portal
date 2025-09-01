<template>
  <div class="w-full">
    <!-- Progress Bar -->
    <div class="mb-6">
      <UProgress 
        :value="progressPercent" 
        :max="100"
        class="w-full h-2"
        color="primary"
      />
    </div>

    <!-- Step Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ currentStep.title }}</h1>
          <p class="mt-2 text-gray-600">{{ currentStep.description }}</p>
        </div>
        <div class="text-right">
          <div class="text-sm font-medium text-gray-500">Step {{ currentStepIndex + 1 }} of {{ steps.length }}</div>
          <div class="text-2xl font-bold text-blue-600">{{ Math.round(progressPercent) }}%</div>
        </div>
      </div>
    </div>

    <!-- Desktop Left Rail (hidden on mobile) -->
    <div class="hidden lg:block lg:absolute lg:left-0 lg:top-0 lg:w-64 lg:pt-32">
      <div class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <h3 class="text-sm font-medium text-gray-700 mb-3">Enrollment Progress</h3>
        <div class="space-y-2">
          <div
            v-for="(step, index) in steps"
            :key="step.id"
            class="flex items-center space-x-2 text-sm"
          >
            <div class="flex-shrink-0">
              <UIcon
                v-if="index < currentStepIndex"
                name="i-heroicons-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <UIcon
                v-else-if="index === currentStepIndex"
                name="i-heroicons-arrow-right-circle"
                class="w-5 h-5 text-blue-500"
              />
              <UIcon
                v-else
                name="i-heroicons-circle"
                class="w-5 h-5 text-gray-300"
              />
            </div>
            <span
              :class="[
                'flex-1',
                index < currentStepIndex ? 'text-green-700' : 
                index === currentStepIndex ? 'text-blue-700 font-medium' : 
                'text-gray-500'
              ]"
            >
              {{ step.title }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentStepIndex: {
    type: Number,
    required: true
  },
  steps: {
    type: Array,
    required: true
  }
})

const currentStep = computed(() => props.steps[props.currentStepIndex])
const progressPercent = computed(() => ((props.currentStepIndex + 1) / props.steps.length) * 100)
</script>
