<template>
  <header class="app-header">
    <RouterLink to="/" class="brand" aria-label="Ir a inicio">
      <span class="brand-mark" aria-hidden="true">✈️</span>
      <span>
        <strong>Itinera</strong>
      </span>
    </RouterLink>

    <nav class="header-nav" aria-label="Navegación principal">
      <RouterLink to="/search">Itinerarios</RouterLink>
      <RouterLink to="/help">Ayuda</RouterLink>
      <RouterLink to="/my-booking">Mi reserva</RouterLink>
    </nav>

    <div class="header-actions">
      <RouterLink v-if="!state.isAuthenticated" to="/login" class="btn btn-small">Entrar</RouterLink>
      <RouterLink v-else to="/profile" class="user-pill" aria-label="Ver perfil de usuario">
        <span class="user-icon" aria-hidden="true">👤</span>
        <strong>{{ state.user?.name || 'Clara Montes' }}</strong>
        <ShieldCheck class="verified-icon" :size="18" aria-label="Cuenta verificada" />
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { ShieldCheck } from 'lucide-vue-next'
import { useDemoState } from '../composables/useDemoState'

const { state } = useDemoState()
</script>
