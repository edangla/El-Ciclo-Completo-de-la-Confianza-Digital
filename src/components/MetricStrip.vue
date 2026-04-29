<template>
  <section class="metric-strip" aria-label="Indicadores de confianza">
    <div v-for="metric in metrics" :key="metric.value" class="metric">
      <strong>{{ metric.value }}</strong>
      <span>{{ metric.label }}</span>
    </div>
  </section>
</template>

<script setup>
defineProps({
  metrics: {
    type: Array,
    required: true,
  },
})
</script>
