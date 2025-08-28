<script setup>
const props = defineProps({
  lesson: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="space-y-6">
    <div v-for="(block, index) in lesson.body" :key="index">
      <!-- Heading -->
      <h3 v-if="block.type === 'h3'" class="text-xl font-semibold text-gray-900 mb-4">
        {{ block.content }}
      </h3>
      
      <!-- Paragraph -->
      <p v-else-if="block.type === 'p'" class="text-gray-700 leading-relaxed">
        {{ block.content }}
      </p>
      
      <!-- Unordered List -->
      <ul v-else-if="block.type === 'ul'" class="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
        <li v-for="(item, itemIndex) in block.content" :key="itemIndex" class="pl-2">
          {{ item }}
        </li>
      </ul>
      
      <!-- Ordered List -->
      <ol v-else-if="block.type === 'ol'" class="list-decimal list-inside space-y-3 text-gray-700 leading-relaxed">
        <li v-for="(item, itemIndex) in block.content" :key="itemIndex" class="pl-2">
          {{ item }}
        </li>
      </ol>
      
      <!-- Note/Callout -->
      <UAlert
        v-else-if="block.type === 'note'"
        :title="'Note'"
        color="blue"
        variant="soft"
        class="mt-4"
      >
        {{ block.content }}
      </UAlert>
    </div>
  </div>
</template>
