<template>
  <article class="itinerary-card">
    <RouterLink :to="`/itinerary/${itinerary.slug}`" class="card-image-link" @click="selectItinerary(itinerary.slug)">
      <img :src="itinerary.heroImage" :alt="`Vista de ${itinerary.destination}`" loading="lazy" />
    </RouterLink>
    <div class="itinerary-card-body">
      <div class="card-tags">
        <span v-for="tag in itinerary.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <div class="card-title-row">
        <div>
          <p class="eyebrow">{{ itinerary.destination }} · {{ itinerary.durationLabel }}</p>
          <h3>{{ itinerary.title }}</h3>
        </div>
        <span class="rating"><Star :size="16" fill="currentColor" /> {{ itinerary.rating }}</span>
      </div>
      <p>{{ itinerary.shortDescription }}</p>
      <div class="provider-line">
        <BadgeCheck :size="17" />
        {{ itinerary.provider.name }} · proveedor verificado
      </div>
      <div class="card-footer">
        <div>
          <small>Desde</small>
          <strong>{{ itinerary.basePrice }} €</strong>
          <span>por persona</span>
        </div>
        <RouterLink :to="`/itinerary/${itinerary.slug}`" class="btn btn-small" @click="selectItinerary(itinerary.slug)">
          Ver detalle
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<script setup>
import { BadgeCheck, Star } from 'lucide-vue-next'
import { useDemoState } from '../composables/useDemoState'

defineProps({
  itinerary: {
    type: Object,
    required: true,
  },
})

const { selectItinerary } = useDemoState()
</script>
