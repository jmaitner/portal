<script setup>
import courses from '~/static-data/courses.json'

const course = courses
</script>

<template>
  <div class="space-y-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column - Course Info -->
      <div class="lg:col-span-2">
        <UCard>
          <template #header>
            <h2 class="text-2xl font-semibold text-gray-900">{{ course.title }}</h2>
          </template>
          
          <div class="space-y-6">
            <div>
              <label class="text-sm font-medium text-gray-700">Progress</label>
              <UProgress 
                :value="course.meta.demoProgressPercent" 
                :max="100"
                class="mt-2"
              />
              <p class="text-sm text-gray-600 mt-1">{{ course.meta.demoProgressPercent }}% complete</p>
            </div>
            
            <UButton 
              to="/course/fl-bdi/learn/m1/l1"
              color="primary"
              size="lg"
            >
              Continue Course
            </UButton>
            
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-3">Course Progress</h3>
              <p class="text-sm text-gray-600 mb-3">You've completed 1 of 12 modules. Continue with the next lesson to make progress.</p>
              <UButton 
                to="/course/fl-bdi/learn/m1/l1"
                color="blue"
                variant="outline"
                size="sm"
              >
                Continue Learning
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
      
      <!-- Right Column - Stats -->
      <div class="space-y-6">
        <!-- Resume Card -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium text-gray-900">Resume Your Course</h3>
          </template>
          <p class="text-gray-600 mb-4">Pick up where you left off in your Florida Basic Driver Improvement course.</p>
          <UButton 
            to="/course/fl-bdi/learn/m1/l1"
            color="primary"
            variant="outline"
            block
          >
            Continue Learning
          </UButton>
        </UCard>
        
        <!-- Stats -->
        <div class="grid grid-cols-1 gap-4">
          <UCard>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600">{{ course.meta.demoCompletedModules }}</div>
              <div class="text-sm text-gray-600">Completed Modules</div>
            </div>
          </UCard>
          
          <UCard>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600">{{ course.meta.totalModules }}</div>
              <div class="text-sm text-gray-600">Total Modules</div>
            </div>
          </UCard>
          
          <UCard>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600">{{ course.meta.demoMinutesRemaining }}</div>
              <div class="text-sm text-gray-600">Minutes Remaining</div>
            </div>
          </UCard>
        </div>
        
        <!-- Progress Card -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium text-gray-900">Course Progress</h3>
          </template>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">{{ course.meta.demoProgressPercent }}%</div>
            <UProgress 
              :value="course.meta.demoProgressPercent" 
              :max="100"
              class="mt-3"
            />
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
