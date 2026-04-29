<template>
  <aside class="sticky-summary">
    <p class="eyebrow">{{ itinerary.destination }} · {{ itinerary.durationLabel }}</p>
    <h2>{{ itinerary.title }}</h2>
    <div class="summary-price">
      <span>Total simulado</span>
      <strong>{{ price.total }} €</strong>
    </div>
    <PriceBreakdown :itinerary="itinerary" :travelers="travelers" :price="price" />
    <div class="summary-note">
      <ShieldCheck :size="18" />
      {{ itinerary.cancellationPolicy }}
    </div>
    <slot />
  </aside>
</template>

<script setup>
import { ShieldCheck } from 'lucide-vue-next'
import PriceBreakdown from './PriceBreakdown.vue'

defineProps({
  itinerary: {
    type: Object,
    required: true,
  },
  travelers: {
    type: Number,
    required: true,
  },
  price: {
    type: Object,
    required: true,
  },
})
</script>
