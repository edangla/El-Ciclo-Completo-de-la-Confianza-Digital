<template>
  <section class="page profile-page">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/">Inicio</RouterLink>
        <span>/</span>
        <span>Perfil</span>
      </nav>

      <div class="profile-layout">
        <aside class="profile-card">
          <div class="profile-avatar">{{ profile.avatarInitials }}</div>
          <h1>{{ profile.firstName }} {{ profile.lastName }}</h1>
          <p>Cuenta verificada de Itinera</p>
          <RouterLink to="/my-booking" class="btn btn-secondary">Ver mi reserva</RouterLink>
        </aside>

        <section class="card profile-details" aria-labelledby="profile-title">
          <p class="eyebrow"><UserRound :size="18" /> Perfil de usuario</p>
          <h2 id="profile-title">Datos personales</h2>
          <div class="profile-field-grid">
            <div class="profile-field">
              <span>Nombre</span>
              <strong>{{ profile.firstName }}</strong>
            </div>
            <div class="profile-field">
              <span>Apellido</span>
              <strong>{{ profile.lastName }}</strong>
            </div>
            <div class="profile-field">
              <span>Correo</span>
              <strong>{{ profile.email }}</strong>
            </div>
            <div class="profile-field">
              <span>Teléfono</span>
              <strong>{{ profile.phone }}</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { UserRound } from 'lucide-vue-next'
import { simulatedUser } from '../data/reservation'
import { useDemoState } from '../composables/useDemoState'

const { state } = useDemoState()

const profile = computed(() => ({
  ...simulatedUser,
  method: state.user?.method,
}))
</script>
