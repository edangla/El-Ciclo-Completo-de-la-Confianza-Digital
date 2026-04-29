<template>
  <section class="page">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/">Inicio</RouterLink>
        <span>/</span>
        <RouterLink to="/checkout">Checkout</RouterLink>
        <span>/</span>
        <span>Pago</span>
      </nav>

      <StepperCheckout :active="3" />

      <div class="grid-2">
        <form class="card" style="padding: 24px" @submit.prevent="pay">
          <p class="eyebrow"><LockKeyhole :size="18" /> Pago protegido</p>
          <h1>Revisa y confirma el pago</h1>
          <p class="lead">
            Esta demo no procesa dinero real. La interfaz representa un pago profesional con cifrado,
            tokenización y validación reforzada.
          </p>

          <div class="payment-logo-row" style="margin: 18px 0">
            <span class="payment-logo">VISA</span>
            <span class="payment-logo">MC</span>
            <span class="payment-logo">Apple Pay</span>
            <span class="payment-logo">G Pay</span>
          </div>

          <div class="payment-methods">
            <button
              v-for="method in paymentMethods"
              :key="method.id"
              class="payment-method"
              :class="{ active: activeMethod === method.id }"
              type="button"
              @click="activeMethod = method.id"
            >
              <strong>{{ method.label }}</strong>
              <span>{{ method.detail }}</span>
              <span class="tag success" style="margin-top: 10px">{{ method.badge }}</span>
            </button>
          </div>

          <div v-if="activeMethod === 'card'" class="form-grid" style="margin-top: 22px">
            <div class="field full">
              <label for="cardNumber">Número de tarjeta</label>
              <input id="cardNumber" v-model="card.number" inputmode="numeric" required />
            </div>
            <div class="field">
              <label for="expiry">Fecha</label>
              <input id="expiry" v-model="card.expiry" required />
            </div>
            <div class="field">
              <label for="cvc">CVC</label>
              <input id="cvc" v-model="card.cvc" inputmode="numeric" required />
            </div>
            <div class="field full">
              <label for="holder">Titular</label>
              <input id="holder" v-model="card.holder" required />
            </div>
          </div>

          <div v-else class="wallet-panel" :class="activeMethod" style="margin-top: 22px">
            <div class="wallet-sheet">
              <div class="wallet-top">
                <span class="wallet-brand">{{ walletCopy.brand }}</span>
                <span class="wallet-status">{{ walletCopy.status }}</span>
              </div>
              <div class="wallet-merchant">
                <span>Itinera</span>
                <strong>{{ price.total }} €</strong>
              </div>
              <div class="wallet-row">
                <span>Tarjeta</span>
                <strong>{{ walletCopy.card }}</strong>
              </div>
              <div class="wallet-row">
                <span>Verificación</span>
                <strong>{{ walletCopy.auth }}</strong>
              </div>
              <button class="wallet-pay-button" type="button" @click="pay">
                {{ walletCopy.button }}
              </button>
              <small>{{ walletCopy.note }}</small>
            </div>
          </div>

          <div class="grid-3" style="margin: 22px 0">
            <SecurePaymentBadge :icon="LockKeyhole" title="Cifrado" text="Los datos viajan protegidos." />
            <SecurePaymentBadge :icon="ShieldCheck" title="Tokenización" text="Itinera no almacena la tarjeta." />
            <SecurePaymentBadge :icon="BadgeCheck" title="PSD2 / SCA" text="Validación reforzada compatible." />
          </div>

          <p class="muted">
            Al confirmar, pasarás por una verificación bancaria simulada. Puedes revisar términos, política de
            privacidad y cancelación antes de pagar.
          </p>

          <button v-if="activeMethod === 'card'" class="btn btn-accent btn-wide" type="submit">Pagar y confirmar {{ price.total }} €</button>
        </form>

        <StickyBookingSummary :itinerary="selectedItinerary" :travelers="state.travelers" :price="price">
          <div class="summary-note">
            <Headphones :size="18" />
            Soporte accesible durante el pago. Si algo falla, puedes contactar antes de reintentar.
          </div>
        </StickyBookingSummary>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { BadgeCheck, Headphones, LockKeyhole, ShieldCheck } from 'lucide-vue-next'
import SecurePaymentBadge from '../components/SecurePaymentBadge.vue'
import StepperCheckout from '../components/StepperCheckout.vue'
import StickyBookingSummary from '../components/StickyBookingSummary.vue'
import { paymentMethods } from '../data/payments'
import { useDemoState } from '../composables/useDemoState'

const router = useRouter()
const { state, selectedItinerary, price, ensureReasonableDefaults } = useDemoState()
ensureReasonableDefaults()

const activeMethod = ref('card')
const card = reactive({
  number: '1234 5678 9101 1121',
  expiry: '12/28',
  cvc: '123',
  holder: state.traveler.firstName ? `${state.traveler.firstName} ${state.traveler.lastName}` : 'Clara Montes',
})

const walletCopy = computed(() => {
  if (activeMethod.value === 'apple-pay') {
    return {
      brand: ' Pay',
      status: 'Pago seguro simulado',
      card: 'Visa demo •••• 1121',
      auth: 'Confirmar con Face ID',
      button: `Pagar ${price.value.total} € con Apple Pay`,
      note: 'No se abre una pasarela real. Esta vista replica el flujo visual de Apple Pay para la demo.',
    }
  }

  return {
    brand: 'G Pay',
    status: 'Pago seguro simulado',
    card: 'Mastercard demo •••• 1121',
    auth: 'Confirmar con cuenta Google',
    button: `Pagar ${price.value.total} € con Google Pay`,
    note: 'No se abre una pasarela real. Esta vista replica el flujo visual de Google Pay para la demo.',
  }
})

function pay() {
  router.push('/payment/verification')
}
</script>
