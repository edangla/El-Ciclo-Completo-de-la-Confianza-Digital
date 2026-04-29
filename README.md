# Itinera

Prototipo frontend en Vue 3 + Vite para una actividad académica sobre confianza digital en transacciones turísticas.

No incluye backend, base de datos, autenticación real ni pagos reales. Todo el flujo está hardcodeado para demostrar señales de confianza antes, durante y después de una reserva turística.

## Ejecutar

Este entorno no tenía `node` ni `npm` disponibles al crear el proyecto. En una máquina con Node 20+:

```bash
npm install
npm run dev
```

Para compilar:

```bash
npm run build
```

## Flujo principal

`/` -> `/search` -> `/itinerary/barcelona-cultural-3-dias` -> `/login` -> `/checkout` -> `/payment` -> `/payment/verification` -> `/confirmation` -> `/my-booking`
