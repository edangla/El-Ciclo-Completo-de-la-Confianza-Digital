<template>
  <section class="page">
    <div class="login-shell">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/">Inicio</RouterLink>
        <span>/</span>
        <RouterLink to="/search">Itinerarios</RouterLink>
        <span>/</span>
        <span>Cuenta</span>
      </nav>

      <StepperCheckout :active="1" />

      <div class="login-card">
        <div class="login-copy">
          <p class="eyebrow"><LockKeyhole :size="18" /> Login simulado</p>
          <h1>Entra para guardar y gestionar tu reserva</h1>
          <p>
            Usamos una identidad ficticia para mostrar cómo un login federado reduce fricción y evita
            compartir contraseñas directamente con Itinera.
          </p>
          <ul class="policy-list">
            <li><CheckCircle2 :size="18" /> Guarda reservas y documentos</li>
            <li><CheckCircle2 :size="18" /> Recibe confirmación por email</li>
            <li><CheckCircle2 :size="18" /> Gestiona cambios o cancelaciones</li>
            <li><CheckCircle2 :size="18" /> Recupera itinerarios en cualquier dispositivo</li>
          </ul>
        </div>

        <GoogleLoginMock @success="handleSuccess" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { CheckCircle2, LockKeyhole } from 'lucide-vue-next'
import GoogleLoginMock from '../components/GoogleLoginMock.vue'
import StepperCheckout from '../components/StepperCheckout.vue'
import { useDemoState } from '../composables/useDemoState'

const router = useRouter()
const { login } = useDemoState()

function handleSuccess(method) {
  login(method)
  router.push('/checkout')
}
</script>
