<template>
  <section class="page">
    <div class="container">
      <div class="help-hero">
        <p class="eyebrow"><HeartHandshake :size="18" /> Benevolencia y soporte</p>
        <h1>Estamos aquí para ayudarte</h1>
        <p class="lead">
          Busca respuestas, revisa políticas claras o contacta con una persona. La ayuda está visible
          antes y después de reservar.
        </p>
        <form class="help-search" @submit.prevent>
          <input v-model="query" placeholder="Buscar: cancelación, pago, confirmación..." />
          <button class="btn" type="submit">Buscar</button>
        </form>
      </div>

      <section class="section-tight" style="padding-inline: 0">
        <div class="grid-3">
          <article class="feature-card">
            <MessageCircle :size="28" />
            <h3>Chat simulado</h3>
            <p>Primera respuesta estimada en 3 minutos para dudas rápidas.</p>
          </article>
          <article class="feature-card">
            <Mail :size="28" />
            <h3>Email</h3>
            <p>Respuesta media de 2 horas con resumen por escrito.</p>
          </article>
          <article class="feature-card">
            <Phone :size="28" />
            <h3>Teléfono</h3>
            <p>Disponible para incidencias cercanas a la fecha del viaje.</p>
          </article>
        </div>
      </section>

      <section class="section-tight" style="padding-inline: 0">
        <div class="section-header">
          <p class="eyebrow">Artículos rápidos</p>
          <h2>Resolver sin aumentar la ansiedad</h2>
        </div>
        <div class="grid-4">
          <article class="article-card" v-for="article in articles" :key="article.title">
            <component :is="article.icon" :size="26" />
            <h3>{{ article.title }}</h3>
            <p>{{ article.text }}</p>
          </article>
        </div>
      </section>

      <section class="section-tight" style="padding-inline: 0">
        <div class="grid-2">
          <div>
            <p class="eyebrow">FAQs generales</p>
            <h2>Antes de reservar</h2>
            <FAQAccordion :faqs="generalFaqs" />
          </div>
          <div>
            <p class="eyebrow">Pago y post-compra</p>
            <h2>Durante y después</h2>
            <FAQAccordion :faqs="[...paymentFaqs, ...postPurchaseFaqs]" />
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import {
  CreditCard,
  Download,
  HeartHandshake,
  Mail,
  MessageCircle,
  Phone,
  RefreshCcw,
  ShieldQuestion,
} from 'lucide-vue-next'
import FAQAccordion from '../components/FAQAccordion.vue'
import { generalFaqs, paymentFaqs, postPurchaseFaqs } from '../data/faqs'

const query = ref('')

const articles = [
  { icon: RefreshCcw, title: 'Cómo cancelar', text: 'Revisa la política visible y solicita ayuda antes de confirmar cambios.' },
  { icon: Download, title: 'Descargar confirmación', text: 'Encuentra tu PDF simulado desde Confirmación o Mi reserva.' },
  { icon: CreditCard, title: 'Problemas con el pago', text: 'Comprueba la validación reforzada y contacta si el banco no responde.' },
  { icon: ShieldQuestion, title: 'Cambios de última hora', text: 'Te mostramos alternativas y un canal humano para resolver incidencias.' },
]
</script>
