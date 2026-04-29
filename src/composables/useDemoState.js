import { computed, reactive, watch } from 'vue'
import { getItineraryBySlug } from '../data/itineraries'
import { simulatedReservation, simulatedUser } from '../data/reservation'

const STORAGE_KEY = 'itinera-demo-state'

const defaults = {
  selectedItinerarySlug: 'barcelona-cultural-3-dias',
  travelers: 2,
  isAuthenticated: false,
  user: null,
  traveler: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'España',
    preferences: '',
    acceptTerms: false,
    allowComms: false,
  },
  bookingConfirmed: false,
  locator: simulatedReservation.locator,
  purchaseDate: simulatedReservation.purchaseDate,
}

function loadState() {
  if (typeof localStorage === 'undefined') return { ...defaults }

  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!stored) return { ...defaults }

    const nextState = { ...defaults, ...stored, traveler: { ...defaults.traveler, ...stored.traveler } }
    if (nextState.user) {
      nextState.user = { ...nextState.user, ...simulatedUser }
    }
    if (nextState.traveler.email && nextState.traveler.email !== simulatedUser.email) {
      nextState.traveler.firstName = simulatedUser.firstName
      nextState.traveler.lastName = simulatedUser.lastName
      nextState.traveler.email = simulatedUser.email
      nextState.traveler.phone = simulatedUser.phone
    }
    return nextState
  } catch {
    return { ...defaults }
  }
}

const state = reactive(loadState())

watch(
  state,
  (value) => {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true }
)

export function useDemoState() {
  const selectedItinerary = computed(() => getItineraryBySlug(state.selectedItinerarySlug))

  const price = computed(() => {
    const subtotal = selectedItinerary.value.basePrice * state.travelers
    const service = 19
    const taxes = Math.round(subtotal * 0.06)
    return {
      subtotal,
      service,
      taxes,
      total: subtotal + service + taxes,
    }
  })

  function selectItinerary(slug) {
    state.selectedItinerarySlug = slug
  }

  function login(method = 'google') {
    state.isAuthenticated = true
    state.user = { ...simulatedUser, method }
    if (!state.traveler.email) {
      state.traveler.firstName = simulatedUser.firstName
      state.traveler.lastName = simulatedUser.lastName
      state.traveler.email = simulatedUser.email
      state.traveler.phone = simulatedUser.phone
    }
  }

  function saveTraveler(traveler) {
    state.traveler = { ...state.traveler, ...traveler }
    state.travelers = Number(traveler.travelers || state.travelers)
  }

  function confirmBooking() {
    state.bookingConfirmed = true
    state.locator = simulatedReservation.locator
    state.purchaseDate = simulatedReservation.purchaseDate
  }

  function ensureReasonableDefaults() {
    if (!state.selectedItinerarySlug) state.selectedItinerarySlug = defaults.selectedItinerarySlug
    if (!state.travelers) state.travelers = defaults.travelers
  }

  return {
    state,
    selectedItinerary,
    price,
    selectItinerary,
    login,
    saveTraveler,
    confirmBooking,
    ensureReasonableDefaults,
  }
}
