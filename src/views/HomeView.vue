<template>
  <section class="hero" :style="{ '--hero-image': `url(${heroImage})` }">
    <div class="hero-content">
      <p class="eyebrow"><ShieldCheck :size="18" /> Itinerarios verificados para viajar con calma</p>
      <h1>Reserva itinerarios claros, verificados y listos para disfrutar</h1>
      <p class="lead">
        Descubre escapadas turísticas con precios transparentes, confirmación inmediata y soporte real antes,
        durante y después de la reserva.
      </p>
      <div class="hero-trust">
        <span><LockKeyhole :size="17" /> Pago protegido</span>
        <span><BadgeCheck :size="17" /> Partners verificados</span>
        <span><HeartHandshake :size="17" /> Atención humana disponible</span>
      </div>

      <form class="search-panel" @submit.prevent="goToSearch">
        <label>
          Destino
          <select v-model="search.destination">
            <option>Barcelona</option>
            <option>Roma</option>
            <option>Lisboa</option>
            <option>Sevilla</option>
            <option>París</option>
          </select>
        </label>
        <label>
          Duración
          <select v-model="search.duration">
            <option>1-2 días</option>
            <option>3 días</option>
            <option>4-5 días</option>
          </select>
        </label>
        <label>
          Estilo
          <select v-model="search.style">
            <option>Cultural</option>
            <option>Gastronómico</option>
            <option>Slow travel</option>
            <option>Premium</option>
          </select>
        </label>
        <label>
          Presupuesto
          <select v-model="search.budget">
            <option>Hasta 250 €</option>
            <option>250-350 €</option>
            <option>350 € o más</option>
          </select>
        </label>
        <label>
          Viajeros
          <select v-model="search.travelers">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </label>
        <button class="btn btn-accent" type="submit">Explorar itinerarios</button>
      </form>
    </div>
  </section>

  <section class="section-tight">
    <TrustBar :items="trustItems" />
  </section>

  <MetricStrip :metrics="metrics" />

  <section class="section">
    <div class="container">
      <div class="section-header">
        <p class="eyebrow">La promesa</p>
        <h2>Información suficiente antes de reservar</h2>
        <p>
          Itinera reduce la incertidumbre desde el primer clic: proveedores revisados, opiniones reales,
          condiciones visibles y precio explicado antes de avanzar al pago.
        </p>
      </div>
      <div class="grid-4">
        <article class="feature-card" v-for="benefit in benefits" :key="benefit.title">
          <component :is="benefit.icon" :size="28" />
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.text }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section-tight">
    <div class="container">
      <div class="section-header center">
        <p class="eyebrow">Cómo funciona</p>
        <h2>Un flujo pensado para mantener el control</h2>
      </div>
      <div class="steps-row">
        <article class="step-card">
          <span class="step-number">1</span>
          <h3>Elige con contexto</h3>
          <p>Compara itinerarios con rating, proveedor, política de cancelación y precio desde el inicio.</p>
        </article>
        <article class="step-card">
          <span class="step-number">2</span>
          <h3>Revisa antes de pagar</h3>
          <p>El checkout muestra cada paso, los datos necesarios y el total final sin costes ocultos.</p>
        </article>
        <article class="step-card">
          <span class="step-number">3</span>
          <h3>Viaja con respaldo</h3>
          <p>Recibes localizador, documentos simulados, próximos pasos y soporte si surge un imprevisto.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <p class="eyebrow">Destinos destacados</p>
        <h2>Escapadas listas para comparar</h2>
      </div>
      <div class="itinerary-grid">
        <ItineraryCard v-for="itinerary in featured" :key="itinerary.id" :itinerary="itinerary" />
      </div>
    </div>
  </section>

  <section class="section-tight">
    <div class="container">
      <div class="section-header">
        <p class="eyebrow">Componente emocional</p>
        <h2>Viajeros que compraron con claridad</h2>
      </div>
      <div class="grid-3">
        <ReviewCard v-for="review in homeReviews" :key="review.id" :review="review" />
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container grid-2">
      <div>
        <p class="eyebrow">Preguntas frecuentes</p>
        <h2>Respuestas antes de decidir</h2>
        <p>
          Las dudas principales están visibles antes de llegar al checkout para evitar sorpresas y reforzar
          la integridad de la plataforma.
        </p>
      </div>
      <FAQAccordion :faqs="generalFaqs.slice(0, 4)" />
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  BadgeCheck,
  CalendarCheck,
  CreditCard,
  HeartHandshake,
  Headphones,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from 'lucide-vue-next'
import FAQAccordion from '../components/FAQAccordion.vue'
import ItineraryCard from '../components/ItineraryCard.vue'
import MetricStrip from '../components/MetricStrip.vue'
import ReviewCard from '../components/ReviewCard.vue'
import TrustBar from '../components/TrustBar.vue'
import { generalFaqs } from '../data/faqs'
import { itineraries } from '../data/itineraries'
import { reviews } from '../data/reviews'
import { useDemoState } from '../composables/useDemoState'

const router = useRouter()
const { state } = useDemoState()

const heroImage = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80'
const search = reactive({
  destination: 'Barcelona',
  duration: '3 días',
  style: 'Cultural',
  budget: '250-350 €',
  travelers: String(state.travelers || 2),
})

const trustItems = [
  { icon: BadgeCheck, title: 'Itinerarios verificados', text: 'Partners locales revisados por Itinera.' },
  { icon: CreditCard, title: 'Pago seguro', text: 'Cifrado, tokenización y validación reforzada.' },
  { icon: CalendarCheck, title: 'Cancelación flexible', text: 'Condiciones visibles antes de reservar.' },
  { icon: Headphones, title: 'Soporte humano', text: 'Ayuda contextual si algo cambia.' },
]

const metrics = [
  { value: '12.000+', label: 'viajeros satisfechos' },
  { value: '4,8/5', label: 'valoración media' },
  { value: '98%', label: 'partners verificados' },
  { value: '7/7', label: 'soporte simulado disponible' },
]

const benefits = [
  { icon: ShieldCheck, title: 'Sistemas seguros', text: 'Señales de privacidad, pago protegido y validación SCA en el momento adecuado.' },
  { icon: Sparkles, title: 'Diseño claro', text: 'Jerarquía visual, estados y resúmenes para saber siempre dónde estás.' },
  { icon: HeartHandshake, title: 'Acompañamiento', text: 'Mensajes tranquilos, ayuda visible y próximos pasos después de comprar.' },
  { icon: BadgeCheck, title: 'Integridad', text: 'Precio, condiciones y consentimiento diferenciados para evitar patrones oscuros.' },
]

const featured = itineraries.slice(0, 3)
const homeReviews = reviews.slice(0, 3)

function goToSearch() {
  state.travelers = Number(search.travelers)
  router.push('/search')
}
</script>
