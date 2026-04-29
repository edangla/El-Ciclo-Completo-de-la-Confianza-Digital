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

## Publicar en GitHub Pages

El proyecto está preparado para GitHub Pages como Project Page del repositorio `El-Ciclo-Completo-de-la-Confianza-Digital`.

1. Sube los cambios a GitHub.
2. Activa Pages desde `Settings` -> `Pages`.
3. En `Build and deployment`, selecciona `GitHub Actions`.
4. El workflow `Deploy to GitHub Pages` compilará y publicará `dist`.

La app usa rutas con hash (`/#/...`) para que los enlaces internos funcionen al refrescar o compartir URLs en GitHub Pages.

## Flujo principal

`/` -> `/#/search` -> `/#/itinerary/barcelona-cultural-3-dias` -> `/#/login` -> `/#/checkout` -> `/#/payment` -> `/#/payment/verification` -> `/#/confirmation` -> `/#/my-booking`
