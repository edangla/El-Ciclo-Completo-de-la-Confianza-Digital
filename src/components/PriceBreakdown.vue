<template>
  <div class="price-breakdown">
    <div>
      <span>{{ itinerary.title }}</span>
      <strong>{{ price.subtotal }} €</strong>
    </div>
    <div>
      <span>{{ travelers }} viajeros x {{ itinerary.basePrice }} €</span>
      <span>Incluido arriba</span>
    </div>
    <div>
      <span>Servicio Itinera</span>
      <strong>{{ price.service }} €</strong>
    </div>
    <div>
      <span>Impuestos estimados</span>
      <strong>{{ price.taxes }} €</strong>
    </div>
    <div class="price-total">
      <span>Total</span>
      <strong>{{ price.total }} €</strong>
    </div>
    <p><CheckCircle2 :size="16" /> Sin costes ocultos. Verás este total antes de pagar.</p>
  </div>
</template>

<script setup>
import { CheckCircle2 } from 'lucide-vue-next'

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
