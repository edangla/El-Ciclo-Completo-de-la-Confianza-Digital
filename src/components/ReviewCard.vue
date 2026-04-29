<template>
  <article class="review-card">
    <div class="review-top">
      <div class="avatar">{{ initials }}</div>
      <div>
        <strong>{{ review.name }}</strong>
        <span>{{ review.location }} · {{ review.date }}</span>
      </div>
      <span class="rating review-rating"><Star :size="15" fill="currentColor" /> {{ review.rating }}</span>
    </div>
    <p>“{{ review.text }}”</p>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { Star } from 'lucide-vue-next'

const props = defineProps({
  review: {
    type: Object,
    required: true,
  },
})

const initials = computed(() =>
  props.review.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
)
</script>
