<template>
  <div class="login-mock">
    <div v-if="phase === 'idle'" class="login-options">
      <button class="login-provider" type="button" @click="startGoogle">
        <span class="google-dot">G</span>
        Continuar con Google
      </button>
      <button class="login-provider" type="button" @click="startEmail">
        <Mail :size="20" />
        Continuar con email
      </button>
      <p><LockKeyhole :size="16" /> Itinera no recibe tu contraseña. Este login es una simulación académica.</p>
    </div>

    <div v-else-if="phase === 'authorizing'" class="auth-panel">
      <div class="loader"></div>
      <p class="eyebrow">Proveedor externo simulado</p>
      <h3>Verificando identidad</h3>
      <p>Autorización ficticia en curso. Volverás a Itinera para revisar la reserva.</p>
    </div>

    <div v-else class="auth-panel success">
      <CheckCircle2 :size="42" />
      <h3>Cuenta conectada</h3>
      <p>Identidad verificada para continuar con el checkout.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CheckCircle2, LockKeyhole, Mail } from 'lucide-vue-next'

const emit = defineEmits(['success'])
const phase = ref('idle')

function finish(method) {
  phase.value = 'success'
  window.setTimeout(() => emit('success', method), 650)
}

function startGoogle() {
  phase.value = 'authorizing'
  window.setTimeout(() => finish('google'), 900)
}

function startEmail() {
  phase.value = 'authorizing'
  window.setTimeout(() => finish('email'), 700)
}
</script>
