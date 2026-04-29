<template>
  <ol class="checkout-stepper" aria-label="Progreso de checkout">
    <li v-for="step in steps" :key="step.number" :class="{ active: step.number === active, done: step.number < active }">
      <span>{{ step.number }}</span>
      <strong>{{ step.label }}</strong>
    </li>
  </ol>
</template>

<script setup>
defineProps({
  active: {
    type: Number,
    required: true,
  },
})

const steps = [
  { number: 1, label: 'Cuenta' },
  { number: 2, label: 'Datos del viajero' },
  { number: 3, label: 'Pago' },
  { number: 4, label: 'Confirmación' },
]
</script>
