<template>
  <section class="page">
    <div class="container">
      <StepperCheckout :active="3" />
      <SCAChallengeMock :amount="price.total" @complete="complete" />
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import SCAChallengeMock from '../components/SCAChallengeMock.vue'
import StepperCheckout from '../components/StepperCheckout.vue'
import { useDemoState } from '../composables/useDemoState'

const router = useRouter()
const { price, confirmBooking } = useDemoState()

function complete() {
  confirmBooking()
  router.push('/confirmation')
}
</script>
