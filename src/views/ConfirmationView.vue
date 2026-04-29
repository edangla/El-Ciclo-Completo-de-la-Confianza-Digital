<template>
  <section class="page">
    <div class="container">
      <StepperCheckout :active="4" />

      <div class="confirmation-hero">
        <div class="success-icon"><CheckCircle2 :size="34" /></div>
        <div>
          <p class="eyebrow">Después: La Memoria</p>
          <h1>Reserva confirmada</h1>
          <p class="lead">
            Tu itinerario queda confirmado al instante. Te hemos enviado un email con el localizador,
            el resumen y los próximos pasos.
          </p>
        </div>
        <div class="button-row">
          <button class="btn btn-secondary" type="button"><Download :size="18" /> Descargar PDF simulado</button>
          <RouterLink to="/my-booking" class="btn btn-accent">Ver mi reserva</RouterLink>
          <RouterLink to="/help" class="btn btn-secondary">Contactar soporte</RouterLink>
        </div>
      </div>

      <div class="grid-2" style="margin-top: 28px">
        <div class="status-card">
          <p class="eyebrow">Prueba de reserva</p>
          <h2>{{ selectedItinerary.title }}</h2>
          <div class="status-grid">
            <div class="status-row">
              <span>Localizador</span>
              <strong>{{ state.locator }}</strong>
            </div>
            <div class="status-row">
              <span>Estado</span>
              <strong>{{ simulatedReservation.status }}</strong>
            </div>
            <div class="status-row">
              <span>Fecha de compra</span>
              <strong>{{ state.purchaseDate }}</strong>
            </div>
            <div class="status-row">
              <span>Total pagado</span>
              <strong>{{ price.total }} €</strong>
            </div>
            <div class="status-row">
              <span>Viajero principal</span>
              <strong>{{ travelerName }}</strong>
            </div>
            <div class="status-row">
              <span>Email</span>
              <strong>{{ state.traveler.email || simulatedReservation.traveler.email }}</strong>
            </div>
          </div>
        </div>

        <div class="status-card">
          <p class="eyebrow">Próximos pasos</p>
          <TimelineSteps :items="postPurchaseTimeline" />
        </div>
      </div>

      <div class="grid-2" style="margin-top: 24px">
        <SupportCard />
        <div class="status-card">
          <p class="eyebrow">FAQs post-compra</p>
          <FAQAccordion :faqs="postPurchaseFaqs.slice(0, 3)" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { CheckCircle2, Download } from 'lucide-vue-next'
import FAQAccordion from '../components/FAQAccordion.vue'
import StepperCheckout from '../components/StepperCheckout.vue'
import SupportCard from '../components/SupportCard.vue'
import TimelineSteps from '../components/TimelineSteps.vue'
import { postPurchaseFaqs } from '../data/faqs'
import { simulatedReservation } from '../data/reservation'
import { useDemoState } from '../composables/useDemoState'

const { state, selectedItinerary, price, confirmBooking } = useDemoState()

onMounted(() => {
  if (!state.bookingConfirmed) confirmBooking()
})

const travelerName = computed(() => {
  if (state.traveler.firstName) return `${state.traveler.firstName} ${state.traveler.lastName}`.trim()
  return `${simulatedReservation.traveler.firstName} ${simulatedReservation.traveler.lastName}`
})

const postPurchaseTimeline = [
  { title: 'Reserva confirmada', text: 'Localizador generado y pago marcado como aprobado.', current: true },
  { title: 'Email enviado', text: 'Resumen, condiciones y documentos iniciales enviados al viajero.' },
  { title: 'Recordatorio previo al viaje', text: 'Recibirás un aviso antes de la fecha de salida.' },
  { title: 'Asistencia disponible', text: 'El centro de ayuda permanece accesible si surge un cambio.' },
]
</script>
