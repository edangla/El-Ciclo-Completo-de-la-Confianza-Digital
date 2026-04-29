<template>
  <section class="page">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/">Inicio</RouterLink>
        <span>/</span>
        <span>Checkout</span>
      </nav>

      <StepperCheckout :active="2" />

      <div class="grid-2">
        <form class="card" style="padding: 24px" @submit.prevent="submitCheckout">
          <p class="eyebrow"><ShieldCheck :size="18" /> Durante: El Control</p>
          <h1>Datos del viajero</h1>
          <p class="lead">
            Solo pedimos los datos necesarios para emitir la confirmación, contactar si hay cambios y
            preparar el itinerario.
          </p>

          <div v-if="error" class="error-box">{{ error }}</div>

          <div class="form-grid" style="margin-top: 20px">
            <div class="field">
              <label for="firstName">Nombre *</label>
              <input id="firstName" v-model="form.firstName" autocomplete="given-name" required />
            </div>
            <div class="field">
              <label for="lastName">Apellidos *</label>
              <input id="lastName" v-model="form.lastName" autocomplete="family-name" required />
            </div>
            <div class="field">
              <label for="email">Email *</label>
              <input id="email" v-model="form.email" type="email" autocomplete="email" required />
              <small>Lo usamos para enviarte el localizador y los documentos.</small>
            </div>
            <div class="field">
              <label for="phone">Teléfono *</label>
              <input id="phone" v-model="form.phone" autocomplete="tel" required />
              <small>Solo para avisos importantes de la reserva.</small>
            </div>
            <div class="field">
              <label for="country">País *</label>
              <select id="country" v-model="form.country" required>
                <option>España</option>
                <option>Portugal</option>
                <option>Francia</option>
                <option>Italia</option>
                <option>Alemania</option>
              </select>
            </div>
            <div class="field">
              <label for="travelers">Viajeros *</label>
              <select id="travelers" v-model="form.travelers" required>
                <option :value="1">1</option>
                <option :value="2">2</option>
                <option :value="3">3</option>
                <option :value="4">4</option>
              </select>
            </div>
            <div class="field full">
              <label for="preferences">Preferencias opcionales</label>
              <textarea id="preferences" v-model="form.preferences" placeholder="Ritmo tranquilo, accesibilidad, dieta, intereses culturales..." />
            </div>
          </div>

          <div class="check-row" style="margin-top: 18px">
            <input id="acceptTerms" v-model="form.acceptTerms" type="checkbox" />
            <label for="acceptTerms">
              Acepto los términos, la política de cancelación y el tratamiento necesario para gestionar la reserva. *
            </label>
          </div>
          <div class="check-row" style="margin-top: 10px">
            <input id="allowComms" v-model="form.allowComms" type="checkbox" />
            <label for="allowComms">
              Quiero recibir recomendaciones de viaje. Opcional y separado de la reserva.
            </label>
          </div>

          <div class="button-row" style="margin-top: 22px">
            <button class="btn btn-accent" type="submit">Continuar al pago</button>
            <RouterLink :to="`/itinerary/${selectedItinerary.slug}`" class="btn btn-secondary">Revisar itinerario</RouterLink>
          </div>
        </form>

        <StickyBookingSummary :itinerary="selectedItinerary" :travelers="Number(form.travelers)" :price="displayPrice">
          <div class="success-box">
            Pago seguro con cifrado. El total permanece visible antes de confirmar.
          </div>
        </StickyBookingSummary>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ShieldCheck } from 'lucide-vue-next'
import StepperCheckout from '../components/StepperCheckout.vue'
import StickyBookingSummary from '../components/StickyBookingSummary.vue'
import { useDemoState } from '../composables/useDemoState'

const router = useRouter()
const { state, selectedItinerary, saveTraveler, ensureReasonableDefaults } = useDemoState()
ensureReasonableDefaults()

const form = reactive({
  ...state.traveler,
  travelers: state.travelers,
})
const error = ref('')
const displayPrice = computed(() => {
  const travelers = Number(form.travelers || state.travelers || 2)
  const subtotal = selectedItinerary.value.basePrice * travelers
  const service = 19
  const taxes = Math.round(subtotal * 0.06)
  return {
    subtotal,
    service,
    taxes,
    total: subtotal + service + taxes,
  }
})

function submitCheckout() {
  error.value = ''
  const required = ['firstName', 'lastName', 'email', 'phone', 'country']
  const missing = required.some((field) => !String(form[field] || '').trim())
  if (missing) {
    error.value = 'Completa los campos obligatorios para continuar.'
    return
  }
  if (!form.acceptTerms) {
    error.value = 'Debes aceptar las condiciones necesarias para gestionar la reserva.'
    return
  }

  saveTraveler(form)
  router.push('/payment')
}
</script>
