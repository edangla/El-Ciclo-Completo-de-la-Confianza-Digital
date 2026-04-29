<template>
  <aside class="support-card">
    <div class="support-icon"><Headphones :size="22" /></div>
    <div>
      <p class="eyebrow">Atención humana disponible</p>
      <h3>Estamos aquí para ayudarte</h3>
      <p>Chat simulado 7/7, email con respuesta media de 2 horas y teléfono para incidencias cercanas al viaje.</p>
      <RouterLink to="/help" class="btn btn-secondary btn-small">Abrir centro de ayuda</RouterLink>
    </div>
  </aside>
</template>

<script setup>
import { Headphones } from 'lucide-vue-next'
</script>
