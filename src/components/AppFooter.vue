<template>
  <footer class="app-footer">
    <div class="footer-grid">
      <div>
        <RouterLink to="/" class="brand footer-brand">
          <span class="brand-mark" aria-hidden="true">✈️</span>
          <span>
            <strong>Itinera</strong>
            <small>confianza digital para viajar</small>
          </span>
        </RouterLink>
        <p>Itinerarios verificados, precio claro y soporte humano antes, durante y después de reservar.</p>
      </div>
      <div>
        <h3>Producto</h3>
        <RouterLink to="/search">Explorar itinerarios</RouterLink>
        <RouterLink to="/help">Centro de ayuda</RouterLink>
        <RouterLink to="/my-booking">Gestionar reserva</RouterLink>
      </div>
      <div>
        <h3>Confianza</h3>
        <span>Pago seguro con cifrado</span>
        <span>Proveedores verificados</span>
        <span>Cancelación flexible</span>
      </div>
      <div>
        <h3>Soporte</h3>
        <span>Chat simulado 7/7</span>
        <span>hola@itinera.demo</span>
        <span>+34 900 204 026</span>
      </div>
    </div>
    <div class="footer-bottom">
      <span>Prototipo académico sin pagos reales.</span>
      <span>Privacidad · Términos · Cookies</span>
    </div>
  </footer>
</template>
