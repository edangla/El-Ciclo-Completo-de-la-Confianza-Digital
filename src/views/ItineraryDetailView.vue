<template>
  <section class="page">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/">Inicio</RouterLink>
        <span>/</span>
        <RouterLink to="/search">Itinerarios</RouterLink>
        <span>/</span>
        <span>{{ itinerary.destination }}</span>
      </nav>

      <div class="detail-hero-grid">
        <img :src="itinerary.heroImage" :alt="`Imagen principal de ${itinerary.destination}`" />
        <div class="detail-side-images">
          <img v-for="image in itinerary.gallery.slice(0, 2)" :key="image" :src="image" :alt="`Detalle visual de ${itinerary.destination}`" loading="lazy" />
        </div>
      </div>

      <div class="grid-2">
        <article>
          <div class="detail-header">
            <div>
              <p class="eyebrow"><BadgeCheck :size="18" /> Proveedor verificado por Itinera</p>
              <h1>{{ itinerary.title }}</h1>
              <p class="lead">{{ itinerary.longDescription }}</p>
            </div>
            <span class="rating"><Star :size="18" fill="currentColor" /> {{ itinerary.rating }} · {{ itinerary.reviewCount }} opiniones</span>
          </div>

          <div class="hero-trust detail-trust" style="margin-top: 8px">
            <span><CalendarCheck :size="17" /> {{ itinerary.durationLabel }}</span>
            <span><Languages :size="17" /> {{ itinerary.languages.join(', ') }}</span>
            <span><SlidersHorizontal :size="17" /> Personalización {{ itinerary.personalizationLevel.toLowerCase() }}</span>
          </div>

          <section class="section-tight" style="padding-inline: 0">
            <div class="split-list">
              <div class="list-card">
                <h2>Qué incluye</h2>
                <ul>
                  <li v-for="item in itinerary.includes" :key="item"><CheckCircle2 :size="18" /> {{ item }}</li>
                </ul>
              </div>
              <div class="list-card">
                <h2>Qué no incluye</h2>
                <ul>
                  <li v-for="item in itinerary.excludes" :key="item"><CircleMinus :size="18" /> {{ item }}</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="section-tight" style="padding-inline: 0">
            <div class="section-header">
              <p class="eyebrow">Plan día por día</p>
              <h2>Agenda clara y revisada</h2>
            </div>
            <TimelineSteps :items="dayTimeline" />
          </section>

          <section class="section-tight" style="padding-inline: 0">
            <div class="grid-3">
              <article class="info-card">
                <ShieldCheck :size="26" />
                <h3>Por qué confiar</h3>
                <p>Itinerario revisado por expertos locales, tiempos validados y soporte antes del viaje.</p>
              </article>
              <article class="info-card">
                <CalendarCheck :size="26" />
                <h3>Disponibilidad simulada</h3>
                <p>{{ itinerary.availability.join(' · ') }}</p>
              </article>
              <article class="info-card">
                <Headphones :size="26" />
                <h3>Asistencia</h3>
                <p>Documentación enviada por email y equipo disponible si necesitas ajustar el plan.</p>
              </article>
            </div>
          </section>

          <section class="section-tight" style="padding-inline: 0">
            <div class="list-card">
              <p class="eyebrow">Partner local</p>
              <h2>{{ itinerary.provider.name }}</h2>
              <ul class="policy-list">
                <li><BadgeCheck :size="18" /> Verificado desde {{ itinerary.provider.since }}</li>
                <li><Clock :size="18" /> Respuesta media: {{ itinerary.provider.responseTime }}</li>
                <li><ShieldCheck :size="18" /> Índice de cumplimiento: {{ itinerary.provider.score }}</li>
              </ul>
            </div>
          </section>

          <section class="section-tight" style="padding-inline: 0">
            <div class="section-header">
              <p class="eyebrow">Opiniones verificadas</p>
              <h2>Experiencias que reducen dudas</h2>
            </div>
            <div class="grid-3">
              <ReviewCard v-for="review in detailReviews" :key="review.id" :review="review" />
            </div>
          </section>

          <section class="section-tight" style="padding-inline: 0">
            <div class="section-header">
              <p class="eyebrow">Preguntas específicas</p>
              <h2>Antes de reservar</h2>
            </div>
            <FAQAccordion :faqs="itineraryFaqs" />
          </section>
        </article>

        <StickyBookingSummary :itinerary="itinerary" :travelers="state.travelers" :price="price">
          <button class="btn btn-accent btn-wide" type="button" @click="reserveNow">
            Reservar ahora
          </button>
          <div class="button-row" style="margin-top: 12px">
            <button class="btn btn-secondary btn-small" type="button"><Heart :size="17" /> Guardar</button>
            <button class="btn btn-secondary btn-small" type="button"><Share2 :size="17" /> Compartir</button>
          </div>
        </StickyBookingSummary>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  CircleMinus,
  Clock,
  Headphones,
  Heart,
  Languages,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Star,
} from 'lucide-vue-next'
import FAQAccordion from '../components/FAQAccordion.vue'
import ReviewCard from '../components/ReviewCard.vue'
import StickyBookingSummary from '../components/StickyBookingSummary.vue'
import TimelineSteps from '../components/TimelineSteps.vue'
import { itineraryFaqs } from '../data/faqs'
import { getItineraryBySlug } from '../data/itineraries'
import { getReviewsForItinerary, reviews } from '../data/reviews'
import { useDemoState } from '../composables/useDemoState'

const route = useRoute()
const router = useRouter()
const { state, price, selectItinerary } = useDemoState()
const itinerary = computed(() => getItineraryBySlug(route.params.slug))

watch(
  () => route.params.slug,
  (slug) => selectItinerary(getItineraryBySlug(slug).slug),
  { immediate: true }
)

const detailReviews = computed(() => {
  const scoped = getReviewsForItinerary(itinerary.value.slug)
  return scoped.length ? scoped : reviews.slice(0, 3)
})
const dayTimeline = computed(() =>
  itinerary.value.days.map((day, index) => ({
    title: day.title,
    text: day.description,
    current: index === 0,
  }))
)

function reserveNow() {
  selectItinerary(itinerary.value.slug)
  router.push('/login')
}
</script>
