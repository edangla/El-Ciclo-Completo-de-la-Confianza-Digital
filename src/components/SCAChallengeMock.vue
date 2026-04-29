<template>
  <section class="sca-card">
    <div class="bank-header">
      <div class="bank-mark"><Landmark :size="24" /></div>
      <div>
        <p class="eyebrow">Banco emisor simulado</p>
        <h1>Verificación reforzada del pago</h1>
      </div>
    </div>

    <p class="lead">
      Hemos enviado una notificación segura a tu móvil para autorizar la operación de {{ amount }} €.
    </p>

    <ol class="sca-steps">
      <li v-for="(step, index) in steps" :key="step" :class="{ done: index < activeIndex, active: index === activeIndex }">
        <span>
          <CheckCircle2 v-if="index < activeIndex" :size="18" />
          <LoaderCircle v-else-if="index === activeIndex" :size="18" class="spin" />
          <Circle v-else :size="18" />
        </span>
        {{ step }}
      </li>
    </ol>

    <details class="soft-details">
      <summary>¿Por qué veo este paso?</summary>
      <p>Esta validación adicional ayuda a proteger tu compra y reducir el fraude antes de confirmar el cargo.</p>
    </details>

    <button v-if="complete" class="btn btn-wide" type="button" @click="$emit('complete')">
      Ver confirmación
    </button>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { CheckCircle2, Circle, Landmark, LoaderCircle } from 'lucide-vue-next'

defineProps({
  amount: {
    type: Number,
    required: true,
  },
})

defineEmits(['complete'])

const steps = [
  'Verificando identidad del titular',
  'Notificación enviada a tu banco',
  'Autorización biométrica completada',
  'Pago aprobado',
]

const activeIndex = ref(0)
const complete = ref(false)

onMounted(() => {
  steps.forEach((_, index) => {
    window.setTimeout(() => {
      activeIndex.value = Math.min(index + 1, steps.length)
      complete.value = index === steps.length - 1
    }, 800 * (index + 1))
  })
})
</script>
