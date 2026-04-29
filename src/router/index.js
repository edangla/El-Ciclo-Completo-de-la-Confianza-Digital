import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/search', name: 'search', component: () => import('../views/SearchView.vue') },
  { path: '/itinerary/:slug', name: 'itinerary', component: () => import('../views/ItineraryDetailView.vue') },
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
  { path: '/checkout', name: 'checkout', component: () => import('../views/CheckoutView.vue') },
  { path: '/payment', name: 'payment', component: () => import('../views/PaymentView.vue') },
  { path: '/payment/verification', name: 'payment-verification', component: () => import('../views/PaymentVerificationView.vue') },
  { path: '/confirmation', name: 'confirmation', component: () => import('../views/ConfirmationView.vue') },
  { path: '/my-booking', name: 'my-booking', component: () => import('../views/MyBookingView.vue') },
  { path: '/profile', name: 'profile', component: () => import('../views/ProfileView.vue') },
  { path: '/help', name: 'help', component: () => import('../views/HelpView.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
