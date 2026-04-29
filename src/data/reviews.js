export const reviews = [
  { id: 1, itinerarySlug: 'barcelona-cultural-3-dias', name: 'Laura M.', location: 'Madrid', rating: 5, date: 'Marzo 2026', text: 'Todo estaba muy claro antes de pagar. Me gustó ver el desglose y recibir el itinerario al instante.' },
  { id: 2, itinerarySlug: 'barcelona-cultural-3-dias', name: 'Daniel R.', location: 'Valencia', rating: 5, date: 'Febrero 2026', text: 'La ruta evitó tiempos muertos y las recomendaciones fueron realistas. El soporte respondió una duda en menos de una hora.' },
  { id: 3, itinerarySlug: 'roma-gastronomica-2-dias', name: 'Marta G.', location: 'Bilbao', rating: 4.8, date: 'Enero 2026', text: 'La selección de sitios en Roma fue honesta, sin trampas para turistas. Se notaba el trabajo local.' },
  { id: 4, itinerarySlug: 'lisboa-slow-travel-4-dias', name: 'Aina P.', location: 'Barcelona', rating: 5, date: 'Diciembre 2025', text: 'Me encantó que hubiese alternativas por clima. Viajar con un plan flexible da mucha tranquilidad.' },
  { id: 5, itinerarySlug: 'sevilla-premium-weekend', name: 'Sergio N.', location: 'Zaragoza', rating: 4.7, date: 'Noviembre 2025', text: 'El fin de semana quedó muy bien organizado y el precio final coincidió con lo indicado.' },
  { id: 6, itinerarySlug: 'paris-para-primer-viaje', name: 'Clara V.', location: 'A Coruña', rating: 4.6, date: 'Octubre 2025', text: 'Para una primera visita a París fue perfecto. Información suficiente, sin saturar.' },
  { id: 7, itinerarySlug: 'oporto-foodie-escape', name: 'Iván C.', location: 'Murcia', rating: 4.8, date: 'Septiembre 2025', text: 'Compré con cierta prisa y la confirmación llegó enseguida. La parte de bodegas estuvo muy bien seleccionada.' },
  { id: 8, itinerarySlug: 'amsterdam-canales-y-diseno', name: 'Laura S.', location: 'Granada', rating: 5, date: 'Agosto 2025', text: 'La app transmitía orden. En destino agradecí tener documentos y ayuda en un mismo sitio.' },
  { id: 9, itinerarySlug: 'praga-historia-y-cafe', name: 'Hugo L.', location: 'Vigo', rating: 4.7, date: 'Julio 2025', text: 'Muy buen equilibrio entre historia y pausas. La política de cancelación estaba visible desde el principio.' },
  { id: 10, itinerarySlug: 'barcelona-cultural-3-dias', name: 'Elena T.', location: 'Málaga', rating: 4.9, date: 'Junio 2025', text: 'Reservé para mis padres y pude revisar cada paso. Eso me dio mucha seguridad.' },
  { id: 11, itinerarySlug: 'roma-gastronomica-2-dias', name: 'Pablo F.', location: 'Sevilla', rating: 4.8, date: 'Mayo 2025', text: 'El pago se sintió profesional y el paso de verificación estaba explicado sin alarmar.' },
  { id: 12, itinerarySlug: 'lisboa-slow-travel-4-dias', name: 'Bea J.', location: 'Santander', rating: 5, date: 'Abril 2025', text: 'La sensación fue de acompañamiento. No era solo comprar, era saber qué pasaba después.' },
]

export const getReviewsForItinerary = (slug) =>
  reviews.filter((review) => review.itinerarySlug === slug)
