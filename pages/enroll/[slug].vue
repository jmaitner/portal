<template>
  <div class="min-h-screen bg-gray-50">
    <div class="relative max-w-[760px] mx-auto px-4 py-8 lg:py-12">
      <!-- Stepper Component -->
      <EnrollStepper 
        :current-step-index="currentStepIndex"
        :steps="steps"
      />

      <!-- Step Content -->
      <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:p-8">
        <!-- Step 1: Create Account -->
        <div v-if="currentStepIndex === 0" class="space-y-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">
                First name <span class="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                :class="[
                  'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                  errors.firstName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                ]"
                :aria-invalid="!!errors.firstName"
                aria-describedby="firstName-error"
              />
              <p v-if="errors.firstName" id="firstName-error" class="mt-1 text-sm text-red-600">
                {{ errors.firstName }}
              </p>
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">
                Last name <span class="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                :class="[
                  'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                  errors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                ]"
                :aria-invalid="!!errors.lastName"
                aria-describedby="lastName-error"
              />
              <p v-if="errors.lastName" id="lastName-error" class="mt-1 text-sm text-red-600">
                {{ errors.lastName }}
              </p>
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              :class="[
                'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
              ]"
              :aria-invalid="!!errors.email"
              aria-describedby="email-error"
            />
            <p v-if="errors.email" id="email-error" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  minlength="8"
                  :class="[
                    'mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                    errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                  ]"
                  :aria-invalid="!!errors.password"
                  aria-describedby="password-error"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <UIcon
                    :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                    class="h-5 w-5 text-gray-400 hover:text-gray-600"
                  />
                </button>
              </div>
              <p v-if="errors.password" id="password-error" class="mt-1 text-sm text-red-600">
                {{ errors.password }}
              </p>
              <p class="mt-1 text-sm text-gray-500">
                Must be at least 8 characters long
              </p>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                Confirm password <span class="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                required
                :class="[
                  'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                  errors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                ]"
                :aria-invalid="!!errors.confirmPassword"
                aria-describedby="confirmPassword-error"
              />
              <p v-if="errors.confirmPassword" id="confirmPassword-error" class="mt-1 text-sm text-red-600">
                {{ errors.confirmPassword }}
              </p>
            </div>
          </div>

          <div class="pt-4 border-t border-gray-200">
            <p class="text-sm text-gray-600">
              Already have an account? 
              <NuxtLink to="/login" class="font-medium text-blue-600 hover:text-blue-500">
                Log in
              </NuxtLink>
            </p>
          </div>
        </div>

        <!-- Step 2: Payment -->
        <div v-else-if="currentStepIndex === 1" class="space-y-6">
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-lg font-medium text-gray-900 mb-3">Course Summary</h3>
            <div class="space-y-2 text-sm text-gray-600">
              <div class="flex justify-between">
                <span>Course:</span>
                <span class="font-medium">Florida Basic Driver Improvement</span>
              </div>
              <div class="flex justify-between">
                <span>Duration:</span>
                <span class="font-medium">4 hours</span>
              </div>
              <div class="flex justify-between">
                <span>Price:</span>
                <span class="font-medium text-green-600">$49.99</span>
              </div>
            </div>
          </div>

          <div class="text-center">
            <UButton
              @click="handlePayment"
              color="primary"
              size="lg"
              :loading="isProcessingPayment"
              class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Pay with Stripe
            </UButton>
            <p class="mt-2 text-sm text-gray-500">
              Demo: Click to simulate payment processing
            </p>
          </div>
        </div>

        <!-- Step 3: Court/Reason -->
        <div v-else-if="currentStepIndex === 2" class="space-y-6">
          <div>
            <label for="reason" class="block text-sm font-medium text-gray-700">
              Reason for course <span class="text-red-500">*</span>
            </label>
            <select
              id="reason"
              v-model="form.reason"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select a reason</option>
              <option value="court-ordered">Court-ordered</option>
              <option value="dhsmv">DHSMV</option>
              <option value="insurance">Insurance discount</option>
              <option value="voluntary">Voluntary</option>
            </select>
          </div>

          <!-- Court-ordered or DHSMV fields -->
          <div v-if="['court-ordered', 'dhsmv'].includes(form.reason)" class="space-y-4">
            <div>
              <label for="county" class="block text-sm font-medium text-gray-700">
                County <span class="text-red-500">*</span>
              </label>
              <select
                id="county"
                v-model="form.county"
                required
                :class="[
                  'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                  errors.county ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                ]"
              >
                <option value="">Select a county</option>
                <option v-for="county in counties" :key="county" :value="county">
                  {{ county }}
                </option>
              </select>
              <p v-if="errors.county" class="mt-1 text-sm text-red-600">
                {{ errors.county }}
              </p>
            </div>

            <div>
              <label for="court" class="block text-sm font-medium text-gray-700">
                Court <span class="text-red-500">*</span>
              </label>
              <select
                id="court"
                v-model="form.court"
                required
                :class="[
                  'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                  errors.court ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                ]"
              >
                <option value="">Select a court</option>
                <option v-for="court in filteredCourts" :key="court.id" :value="court.id">
                  {{ court.name }}
                </option>
                <option value="not-listed">Not listed</option>
              </select>
              <p v-if="errors.court" class="mt-1 text-sm text-red-600">
                {{ errors.court }}
              </p>
            </div>

            <div v-if="form.court === 'not-listed'">
              <label for="customCourt" class="block text-sm font-medium text-gray-700">
                Court name <span class="text-red-500">*</span>
              </label>
              <input
                id="customCourt"
                v-model="form.customCourt"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="caseNumber" class="block text-sm font-medium text-gray-700">
                Case/Citation number <span class="text-red-500">*</span>
              </label>
              <input
                id="caseNumber"
                v-model="form.caseNumber"
                type="text"
                required
                pattern="[A-Za-z0-9\-]+"
                :class="[
                  'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                  errors.caseNumber ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                ]"
                :aria-invalid="!!errors.caseNumber"
                aria-describedby="caseNumber-error"
              />
              <p v-if="errors.caseNumber" id="caseNumber-error" class="mt-1 text-sm text-red-600">
                {{ errors.caseNumber }}
              </p>
              <p class="mt-1 text-sm text-gray-500">
                Letters, numbers, and hyphens only
              </p>
            </div>
          </div>

          <!-- Insurance fields -->
          <div v-if="form.reason === 'insurance'" class="space-y-4">
            <div>
              <label for="insuranceCompany" class="block text-sm font-medium text-gray-700">
                Insurance company name <span class="text-red-500">*</span>
              </label>
              <input
                id="insuranceCompany"
                v-model="form.insuranceCompany"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="policyNumber" class="block text-sm font-medium text-gray-700">
                Policy number (optional)
              </label>
              <input
                id="policyNumber"
                v-model="form.policyNumber"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <!-- Step 4: License & Address -->
        <div v-else-if="currentStepIndex === 3" class="space-y-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="dateOfBirth" class="block text-sm font-medium text-gray-700">
                Date of birth <span class="text-red-500">*</span>
              </label>
              <input
                id="dateOfBirth"
                v-model="form.dateOfBirth"
                type="date"
                required
                :class="[
                  'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                  errors.dateOfBirth ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                ]"
                :aria-invalid="!!errors.dateOfBirth"
                aria-describedby="dateOfBirth-error"
              />
              <p v-if="errors.dateOfBirth" id="dateOfBirth-error" class="mt-1 text-sm text-red-600">
                {{ errors.dateOfBirth }}
              </p>
            </div>

            <div>
              <label for="driversLicense" class="block text-sm font-medium text-gray-700">
                Driver's license number <span class="text-red-500">*</span>
              </label>
              <input
                id="driversLicense"
                v-model="form.driversLicense"
                type="text"
                required
                :class="[
                  'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm uppercase',
                  errors.driversLicense ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                ]"
                :aria-invalid="!!errors.driversLicense"
                aria-describedby="driversLicense-error"
              />
              <p v-if="errors.driversLicense" id="driversLicense-error" class="mt-1 text-sm text-red-600">
                {{ errors.driversLicense }}
              </p>
            </div>
          </div>

          <div>
            <label for="licenseState" class="block text-sm font-medium text-gray-700">
              License state <span class="text-red-500">*</span>
            </label>
            <select
              id="licenseState"
              v-model="form.licenseState"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="FL" selected>Florida (FL)</option>
              <option value="AL">Alabama (AL)</option>
              <option value="GA">Georgia (GA)</option>
              <option value="SC">South Carolina (SC)</option>
              <option value="NC">North Carolina (NC)</option>
            </select>
          </div>

          <div>
            <label for="streetAddress" class="block text-sm font-medium text-gray-700">
              Street address <span class="text-red-500">*</span>
            </label>
            <input
              id="streetAddress"
              v-model="form.streetAddress"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="aptSuite" class="block text-sm font-medium text-gray-700">
              Apt/Suite (optional)
            </label>
            <input
              id="aptSuite"
              v-model="form.aptSuite"
              type="text"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700">
                City <span class="text-red-500">*</span>
              </label>
              <input
                id="city"
                v-model="form.city"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="state" class="block text-sm font-medium text-gray-700">
                State <span class="text-red-500">*</span>
              </label>
              <select
                id="state"
                v-model="form.state"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="FL" selected>Florida (FL)</option>
                <option value="AL">Alabama (AL)</option>
                <option value="GA">Georgia (GA)</option>
                <option value="SC">South Carolina (SC)</option>
                <option value="NC">North Carolina (NC)</option>
              </select>
            </div>

            <div>
              <label for="zipCode" class="block text-sm font-medium text-gray-700">
                ZIP code <span class="text-red-500">*</span>
              </label>
              <input
                id="zipCode"
                v-model="form.zipCode"
                type="text"
                required
                pattern="[0-9]{5}"
                maxlength="5"
                :class="[
                  'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                  errors.zipCode ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                ]"
                :aria-invalid="!!errors.zipCode"
                aria-describedby="zipCode-error"
              />
              <p v-if="errors.zipCode" id="zipCode-error" class="mt-1 text-sm text-red-600">
                {{ errors.zipCode }}
              </p>
            </div>
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">
              Phone number (optional)
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <!-- Step 5: Security Questions -->
        <div v-else-if="currentStepIndex === 4" class="space-y-6">
          <div class="text-center mb-6">
            <p class="text-gray-600">
              Choose 3 different questions and enter answers you'll remember.
            </p>
          </div>

          <div class="space-y-6">
            <div
              v-for="(question, index) in form.securityQuestions"
              :key="index"
              class="space-y-3"
            >
              <h4 class="text-sm font-medium text-gray-700">Question {{ index + 1 }}</h4>
              
              <div>
                <label :for="`question-${index}`" class="block text-sm font-medium text-gray-700">
                  Question <span class="text-red-500">*</span>
                </label>
                <select
                  :id="`question-${index}`"
                  v-model="question.question"
                  required
                  :class="[
                    'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                    errors[`securityQuestions.${index}.question`] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                  ]"
                >
                  <option value="">Select a security question</option>
                  <option
                    v-for="q in availableQuestions(index)"
                    :key="q"
                    :value="q"
                  >
                    {{ q }}
                  </option>
                </select>
                <p v-if="errors[`securityQuestions.${index}.question`]" class="mt-1 text-sm text-red-600">
                  {{ errors[`securityQuestions.${index}.question`] }}
                </p>
              </div>

              <div>
                <label :for="`answer-${index}`" class="block text-sm font-medium text-gray-700">
                  Answer <span class="text-red-500">*</span>
                </label>
                <input
                  :id="`answer-${index}`"
                  v-model="question.answer"
                  type="text"
                  required
                  minlength="2"
                  :class="[
                    'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                    errors[`securityQuestions.${index}.answer`] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                  ]"
                  :aria-invalid="!!errors[`securityQuestions.${index}.answer`]"
                />
                <p v-if="errors[`securityQuestions.${index}.answer`]" class="mt-1 text-sm text-red-600">
                  {{ errors[`securityQuestions.${index}.answer`] }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 6: Review & Confirm -->
        <div v-else-if="currentStepIndex === 5" class="space-y-6">
          <div class="space-y-6">
            <!-- Account Section -->
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Account Information</h3>
              <div class="grid grid-cols-1 gap-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Name:</span>
                  <span class="font-medium">{{ form.firstName }} {{ form.lastName }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Email:</span>
                  <span class="font-medium">{{ form.email }}</span>
                </div>
              </div>
            </div>

            <!-- Payment Section -->
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Payment</h3>
              <div class="text-sm text-gray-600">
                <div class="flex justify-between">
                  <span>Course:</span>
                  <span class="font-medium">Florida Basic Driver Improvement</span>
                </div>
                <div class="flex justify-between">
                  <span>Amount:</span>
                  <span class="font-medium text-green-600">$49.99</span>
                </div>
                <div class="flex justify-between">
                  <span>Status:</span>
                  <span class="font-medium text-green-600">Paid</span>
                </div>
              </div>
            </div>

            <!-- Court/Reason Section -->
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Course Reason</h3>
              <div class="text-sm text-gray-600">
                <div class="flex justify-between">
                  <span>Reason:</span>
                  <span class="font-medium">{{ getReasonDisplay(form.reason) }}</span>
                </div>
                <div v-if="['court-ordered', 'dhsmv'].includes(form.reason)" class="space-y-1 mt-2">
                  <div class="flex justify-between">
                    <span>County:</span>
                    <span class="font-medium">{{ form.county }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Court:</span>
                    <span class="font-medium">{{ getCourtDisplay() }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Case Number:</span>
                    <span class="font-medium">{{ form.caseNumber }}</span>
                  </div>
                </div>
                <div v-if="form.reason === 'insurance'" class="space-y-1 mt-2">
                  <div class="flex justify-between">
                    <span>Insurance Company:</span>
                    <span class="font-medium">{{ form.insuranceCompany }}</span>
                  </div>
                  <div v-if="form.policyNumber" class="flex justify-between">
                    <span>Policy Number:</span>
                    <span class="font-medium">{{ form.policyNumber }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- License & Address Section -->
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-3">License & Address</h3>
              <div class="text-sm text-gray-600 space-y-1">
                <div class="flex justify-between">
                  <span>Date of Birth:</span>
                  <span class="font-medium">{{ form.dateOfBirth }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Driver's License:</span>
                  <span class="font-medium">{{ form.driversLicense }}</span>
                </div>
                <div class="flex justify-between">
                  <span>License State:</span>
                  <span class="font-medium">{{ form.licenseState }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Address:</span>
                  <span class="font-medium">
                    {{ form.streetAddress }}
                    {{ form.aptSuite ? `, ${form.aptSuite}` : '' }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span>City, State ZIP:</span>
                  <span class="font-medium">{{ form.city }}, {{ form.state }} {{ form.zipCode }}</span>
                </div>
                <div v-if="form.phone" class="flex justify-between">
                  <span>Phone:</span>
                  <span class="font-medium">{{ form.phone }}</span>
                </div>
              </div>
            </div>

            <!-- Identity Section -->
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Identity Validation</h3>
              <div class="text-sm text-gray-600 space-y-2">
                <div v-for="(question, index) in form.securityQuestions" :key="index">
                  <div class="font-medium">{{ question.question }}</div>
                  <div class="text-gray-500">Answer: {{ question.answer }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-6">
            <div class="flex items-start space-x-3">
              <input
                id="certify"
                v-model="form.certify"
                type="checkbox"
                required
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              />
              <div class="text-sm">
                <label for="certify" class="font-medium text-gray-700">
                  I certify the information provided is accurate <span class="text-red-500">*</span>
                </label>
                <p class="text-gray-500 mt-1">
                  By checking this box, you agree to our 
                  <NuxtLink to="/legal/terms" class="text-blue-600 hover:text-blue-500">Terms of Service</NuxtLink>
                  and 
                  <NuxtLink to="/legal/privacy" class="text-blue-600 hover:text-blue-500">Privacy Policy</NuxtLink>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between pt-6 border-t border-gray-200">
          <UButton
            v-if="currentStepIndex > 0"
            @click="previousStep"
            variant="ghost"
            class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back
          </UButton>
          <div v-else></div>

          <UButton
            v-if="currentStepIndex < steps.length - 1"
            @click="nextStep"
            color="primary"
            :loading="isProcessing"
            class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continue
          </UButton>

          <UButton
            v-else
            @click="completeEnrollment"
            color="primary"
            :loading="isProcessing"
            class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create account & start course
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

// Import static data
import countiesData from '~/static-data/counties/fl.json'
import courtsData from '~/static-data/courts/fl.json'
import securityQuestionsData from '~/static-data/security-questions.json'

// Course data
const courseSlug = useRoute().params.slug
const course = {
  title: 'Florida Basic Driver Improvement',
  duration: '4 hours',
  price: 49.99
}

// Wizard steps
const steps = [
  {
    id: 'account',
    title: 'Create Account',
    description: 'Set up your account with basic information'
  },
  {
    id: 'payment',
    title: 'Payment',
    description: 'Complete your course payment'
  },
  {
    id: 'reason',
    title: 'Course Reason',
    description: 'Tell us why you\'re taking this course'
  },
  {
    id: 'license',
    title: 'License & Address',
    description: 'Provide your driver\'s license and address information'
  },
  {
    id: 'identity',
    title: 'Identity Validation',
    description: 'Set up security questions for account recovery'
  },
  {
    id: 'review',
    title: 'Review & Confirm',
    description: 'Review all information and complete enrollment'
  }
]

// Form state
const currentStepIndex = ref(0)
const showPassword = ref(false)
const isProcessing = ref(false)
const isProcessingPayment = ref(false)

const form = ref({
  // Step 1: Account
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  
  // Step 2: Payment (handled in memory)
  paymentCompleted: false,
  
  // Step 3: Reason
  reason: '',
  county: '',
  court: '',
  customCourt: '',
  caseNumber: '',
  insuranceCompany: '',
  policyNumber: '',
  
  // Step 4: License & Address
  dateOfBirth: '',
  driversLicense: '',
  licenseState: 'FL',
  streetAddress: '',
  aptSuite: '',
  city: '',
  state: 'FL',
  zipCode: '',
  phone: '',
  
  // Step 5: Security Questions
  securityQuestions: [
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' }
  ],
  
  // Step 6: Certification
  certify: false
})

const errors = ref({})

// Computed properties
const counties = computed(() => countiesData)
const courts = computed(() => courtsData)
const securityQuestions = computed(() => securityQuestionsData)

const filteredCourts = computed(() => {
  if (!form.value.county) return courts.value
  return courts.value.filter(court => court.county === form.value.county)
})

// Methods
const validateCurrentStep = () => {
  errors.value = {}
  
  switch (currentStepIndex.value) {
    case 0: // Account
      if (!form.value.firstName) errors.value.firstName = 'First name is required'
      if (!form.value.lastName) errors.value.lastName = 'Last name is required'
      if (!form.value.email) {
        errors.value.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        errors.value.email = 'Please enter a valid email address'
      }
      if (!form.value.password) {
        errors.value.password = 'Password is required'
      } else if (form.value.password.length < 8) {
        errors.value.password = 'Password must be at least 8 characters long'
      }
      if (!form.value.confirmPassword) {
        errors.value.confirmPassword = 'Please confirm your password'
      } else if (form.value.password !== form.value.confirmPassword) {
        errors.value.confirmPassword = 'Passwords do not match'
      }
      break
      
    case 2: // Reason
      if (!form.value.reason) {
        errors.value.reason = 'Please select a reason for taking the course'
      }
      
      if (['court-ordered', 'dhsmv'].includes(form.value.reason)) {
        if (!form.value.county) errors.value.county = 'County is required'
        if (!form.value.court) errors.value.court = 'Court is required'
        if (form.value.court === 'not-listed' && !form.value.customCourt) {
          errors.value.customCourt = 'Court name is required'
        }
        if (!form.value.caseNumber) errors.value.caseNumber = 'Case number is required'
      }
      
      if (form.value.reason === 'insurance' && !form.value.insuranceCompany) {
        errors.value.insuranceCompany = 'Insurance company name is required'
      }
      break
      
    case 3: // License & Address
      if (!form.value.dateOfBirth) {
        errors.value.dateOfBirth = 'Date of birth is required'
      } else {
        const dob = new Date(form.value.dateOfBirth)
        const today = new Date()
        const age = today.getFullYear() - dob.getFullYear()
        if (age < 15) {
          errors.value.dateOfBirth = 'You must be at least 15 years old'
        }
      }
      
      if (!form.value.driversLicense) errors.value.driversLicense = 'Driver\'s license number is required'
      if (!form.value.streetAddress) errors.value.streetAddress = 'Street address is required'
      if (!form.value.city) errors.value.city = 'City is required'
      if (!form.value.zipCode) {
        errors.value.zipCode = 'ZIP code is required'
      } else if (!/^\d{5}$/.test(form.value.zipCode)) {
        errors.value.zipCode = 'ZIP code must be 5 digits'
      }
      break
      
    case 4: // Security Questions
      const questions = form.value.securityQuestions
      const selectedQuestions = questions.map(q => q.question).filter(q => q)
      const uniqueQuestions = new Set(selectedQuestions)
      
      if (uniqueQuestions.size !== 3) {
        errors.value.securityQuestions = 'You must select 3 different questions'
      }
      
      questions.forEach((question, index) => {
        if (!question.question) {
          errors.value[`securityQuestions.${index}.question`] = 'Question is required'
        }
        if (!question.answer || question.answer.length < 2) {
          errors.value[`securityQuestions.${index}.answer`] = 'Answer must be at least 2 characters'
        }
      })
      break
      
    case 5: // Review
      if (!form.value.certify) {
        errors.value.certify = 'You must certify that the information is accurate'
      }
      break
  }
  
  return Object.keys(errors.value).length === 0
}

const availableQuestions = (currentIndex) => {
  const selectedQuestions = form.value.securityQuestions
    .map((q, index) => index !== currentIndex ? q.question : null)
    .filter(q => q)
  
  return securityQuestions.value.filter(q => !selectedQuestions.includes(q))
}

const nextStep = async () => {
  if (!validateCurrentStep()) return
  
  isProcessing.value = true
  
  // Simulate processing
  await new Promise(resolve => setTimeout(resolve, 500))
  
  if (currentStepIndex.value < steps.length - 1) {
    currentStepIndex.value++
  }
  
  isProcessing.value = false
}

const previousStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
  }
}

const handlePayment = async () => {
  isProcessingPayment.value = true
  
  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  form.value.paymentCompleted = true
  isProcessingPayment.value = false
  
  // Auto-advance to next step
  nextStep()
}

const getReasonDisplay = (reason) => {
  const reasonMap = {
    'court-ordered': 'Court-ordered',
    'dhsmv': 'DHSMV',
    'insurance': 'Insurance discount',
    'voluntary': 'Voluntary'
  }
  return reasonMap[reason] || reason
}

const getCourtDisplay = () => {
  if (form.value.court === 'not-listed') {
    return form.value.customCourt
  }
  
  const court = courts.value.find(c => c.id === form.value.court)
  return court ? court.name : form.value.court
}

const completeEnrollment = async () => {
  if (!validateCurrentStep()) return
  
  isProcessing.value = true
  
  // Simulate account creation
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Navigate to course
  await navigateTo(`/course/${courseSlug}`)
  
  isProcessing.value = false
}

// Auto-format driver's license to uppercase
watch(() => form.value.driversLicense, (newVal) => {
  if (newVal) {
    form.value.driversLicense = newVal.toUpperCase()
  }
})
</script>
