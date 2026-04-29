<template>
  <section class="page">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/">Inicio</RouterLink>
        <span>/</span>
        <span>Resultados</span>
      </nav>

      <div class="results-top">
        <div>
          <p class="eyebrow">Antes: La Promesa</p>
          <h1>Itinerarios claros para comparar sin incertidumbre</h1>
          <p class="lead">{{ sortedItineraries.length }} resultados con precio visible, proveedor verificado y condiciones antes de reservar.</p>
        </div>
        <label class="field">
          Ordenar
          <select v-model="sortBy">
            <option value="recommended">Recomendados</option>
            <option value="rating">Mejor valoración</option>
            <option value="price">Precio más bajo</option>
          </select>
        </label>
      </div>

      <div class="filters-shell">
        <aside class="filter-panel">
          <div>
            <h2>Filtros simulados</h2>
            <p>Diseñados para mostrar control sin bloquear el flujo de la demo.</p>
          </div>
          <div>
            <p class="eyebrow">Garantías visibles</p>
            <TrustBar :items="guarantees" compact />
          </div>
          <div>
            <p class="eyebrow">Preferencias</p>
            <div class="filter-chips">
              <button class="filter-chip" type="button">Cancelación flexible</button>
              <button class="filter-chip" type="button">Proveedor verificado</button>
              <button class="filter-chip" type="button">Soporte 7/7</button>
              <button class="filter-chip" type="button">Precio claro</button>
            </div>
          </div>
        </aside>

        <div>
          <div class="itinerary-grid">
            <ItineraryCard v-for="itinerary in sortedItineraries" :key="itinerary.id" :itinerary="itinerary" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { CreditCard, Headphones, LockKeyhole } from 'lucide-vue-next'
import ItineraryCard from '../components/ItineraryCard.vue'
import TrustBar from '../components/TrustBar.vue'
import { itineraries } from '../data/itineraries'

const sortBy = ref('recommended')

const guarantees = [
  { icon: LockKeyhole, title: 'Sin costes ocultos', text: 'El total se revisa antes de pagar.' },
  { icon: CreditCard, title: 'Pago seguro', text: 'Cifrado y tokenización en checkout.' },
  { icon: Headphones, title: 'Soporte 7/7', text: 'Ayuda humana si surge un imprevisto.' },
]

const sortedItineraries = computed(() => {
  const list = [...itineraries]
  if (sortBy.value === 'rating') return list.sort((a, b) => b.rating - a.rating)
  if (sortBy.value === 'price') return list.sort((a, b) => a.basePrice - b.basePrice)
  return list
})
</script>
