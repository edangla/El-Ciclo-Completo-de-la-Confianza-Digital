<template>
  <div class="faq-list">
    <details v-for="faq in faqs" :key="faq.question" class="faq-item">
      <summary>{{ faq.question }}</summary>
      <p>{{ faq.answer }}</p>
    </details>
  </div>
</template>

<script setup>
defineProps({
  faqs: {
    type: Array,
    required: true,
  },
})
</script>
