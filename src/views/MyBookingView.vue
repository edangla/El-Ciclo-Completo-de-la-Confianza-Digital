<template>
  <section class="page">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/">Inicio</RouterLink>
        <span>/</span>
        <span>Mi reserva</span>
      </nav>

      <div class="results-top">
        <div>
          <p class="eyebrow"><ShieldCheck :size="18" /> Control después de la compra</p>
          <h1>Mi reserva</h1>
          <p class="lead">Toda la información clave sigue accesible: estado, documentos, pago y soporte.</p>
        </div>
        <RouterLink to="/help" class="btn btn-secondary">Necesito ayuda</RouterLink>
      </div>

      <div class="grid-2">
        <div>
          <div class="tabs" role="tablist" aria-label="Secciones de la reserva">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="tab-button"
              :class="{ active: activeTab === tab.id }"
              type="button"
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <section v-if="activeTab === 'summary'" class="status-card">
            <p class="eyebrow">Resumen</p>
            <h2>{{ selectedItinerary.title }}</h2>
            <div class="status-grid">
              <div class="status-row"><span>Localizador</span><strong>{{ state.locator }}</strong></div>
              <div class="status-row"><span>Estado</span><strong>Confirmada</strong></div>
              <div class="status-row"><span>Fecha del viaje</span><strong>{{ selectedItinerary.nextDate }}</strong></div>
              <div class="status-row"><span>Proveedor</span><strong>{{ selectedItinerary.provider.name }}</strong></div>
            </div>
            <div style="margin-top: 22px">
              <TimelineSteps :items="itineraryTimeline" />
            </div>
          </section>

          <section v-else-if="activeTab === 'travelers'" class="status-card">
            <p class="eyebrow">Viajeros</p>
            <h2>Datos visibles y editables</h2>
            <div class="status-grid">
              <div class="status-row"><span>Nombre</span><strong>{{ travelerName }}</strong></div>
              <div class="status-row"><span>Email</span><strong>{{ state.traveler.email || simulatedReservation.traveler.email }}</strong></div>
              <div class="status-row"><span>Teléfono</span><strong>{{ state.traveler.phone || simulatedReservation.traveler.phone }}</strong></div>
              <div class="status-row"><span>Viajeros</span><strong>{{ state.travelers }}</strong></div>
            </div>
            <button class="btn btn-secondary" type="button" style="margin-top: 18px">Modificar datos del viajero</button>
          </section>

          <section v-else-if="activeTab === 'payment'" class="status-card">
            <p class="eyebrow">Pago</p>
            <h2>Pago aprobado y trazable</h2>
            <PriceBreakdown :itinerary="selectedItinerary" :travelers="state.travelers" :price="price" />
            <div class="success-box" style="margin-top: 18px">
              Validación reforzada completada. Itinera no almacena los datos reales de tu tarjeta.
            </div>
          </section>

          <section v-else class="status-card">
            <p class="eyebrow">Ayuda</p>
            <h2>Si algo cambia, te acompañamos</h2>
            <p>La cancelación flexible está disponible hasta 7 días antes. Puedes contactar con soporte antes de confirmar cualquier cambio.</p>
            <div class="button-row">
              <button class="btn btn-secondary" type="button">Cancelar reserva</button>
              <RouterLink to="/help" class="btn btn-accent">Contactar soporte</RouterLink>
            </div>
          </section>
        </div>

        <aside class="status-card">
          <p class="eyebrow">Documentos y comunicaciones</p>
          <h2>Todo en un mismo sitio</h2>
          <div class="document-card" v-for="doc in simulatedReservation.documents" :key="doc.title" style="margin-bottom: 10px">
            <strong>{{ doc.title }}</strong>
            <p>{{ doc.type }} · {{ doc.status }}</p>
          </div>

          <h3 style="margin-top: 24px">Historial</h3>
          <TimelineSteps :items="communications" />
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { ShieldCheck } from 'lucide-vue-next'
import PriceBreakdown from '../components/PriceBreakdown.vue'
import TimelineSteps from '../components/TimelineSteps.vue'
import { simulatedReservation } from '../data/reservation'
import { useDemoState } from '../composables/useDemoState'

const { state, selectedItinerary, price, confirmBooking, ensureReasonableDefaults } = useDemoState()
const activeTab = ref('summary')

onMounted(() => {
  ensureReasonableDefaults()
  if (!state.bookingConfirmed) confirmBooking()
})

const tabs = [
  { id: 'summary', label: 'Resumen' },
  { id: 'travelers', label: 'Viajeros' },
  { id: 'payment', label: 'Pago' },
  { id: 'help', label: 'Ayuda' },
]

const travelerName = computed(() => {
  if (state.traveler.firstName) return `${state.traveler.firstName} ${state.traveler.lastName}`.trim()
  return `${simulatedReservation.traveler.firstName} ${simulatedReservation.traveler.lastName}`
})

const itineraryTimeline = computed(() =>
  selectedItinerary.value.days.map((day, index) => ({
    title: day.title,
    text: day.description,
    current: index === 0,
  }))
)

const communications = simulatedReservation.communications.map((item, index) => ({
  title: item.title,
  text: `${item.date}. ${item.detail}`,
  current: index === 0,
}))
</script>
