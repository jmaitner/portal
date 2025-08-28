<template>
  <div class="max-w-4xl mx-auto">
    <div class="space-y-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Support</h1>
        <p class="text-lg text-gray-600">We're here to help you with any questions about your course.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Contact Information -->
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold text-gray-900">Contact Us</h2>
          </template>
          
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-blue-600" />
              <div>
                <p class="font-medium text-gray-900">Email</p>
                <a href="mailto:info@roadreadysafety.com" class="text-blue-600 hover:text-blue-800">
                  info@roadreadysafety.com
                </a>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <UIcon name="i-heroicons-phone" class="w-5 h-5 text-blue-600" />
              <div>
                <p class="font-medium text-gray-900">Phone</p>
                <a href="tel:8888855707" class="text-blue-600 hover:text-blue-800">
                  (888) 885-5707
                </a>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <UIcon name="i-heroicons-clock" class="w-5 h-5 text-blue-600" />
              <div>
                <p class="font-medium text-gray-900">Hours</p>
                <p class="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM EST</p>
              </div>
            </div>
          </div>
        </UCard>

        <!-- FAQ -->
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
          </template>
          
          <div class="space-y-4">
            <div>
              <h3 class="font-medium text-gray-900 mb-2">How long does the course take?</h3>
              <p class="text-gray-600 text-sm">The Florida Basic Driver Improvement course takes approximately 4 hours to complete.</p>
            </div>
            
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Can I pause and resume?</h3>
              <p class="text-gray-600 text-sm">Yes, you can pause and resume your course at any time. Your progress is automatically saved.</p>
            </div>
            
            <div>
              <h3 class="font-medium text-gray-900 mb-2">When will I receive my certificate?</h3>
              <p class="text-gray-600 text-sm">You'll receive your completion certificate immediately upon finishing the course.</p>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Additional Help -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold text-gray-900">Need More Help?</h2>
        </template>
        
        <p class="text-gray-600 mb-4">
          If you're experiencing technical issues or have questions about your course requirements, 
          please don't hesitate to reach out to our support team. We're committed to helping you 
          complete your course successfully.
        </p>
        
        <UButton 
          href="mailto:info@roadreadysafety.com"
          color="primary"
          icon="i-heroicons-envelope"
        >
          Send us an email
        </UButton>
      </UCard>
    </div>
  </div>
</template>
