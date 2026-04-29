import { itineraries } from './itineraries'

export const simulatedUser = {
  id: 'usr_20426',
  firstName: 'Clara',
  lastName: 'Montes',
  name: 'Clara Montes',
  email: 'clara.montes@example.com',
  phone: '+34 612 458 903',
  avatarInitials: 'CM',
}

export const simulatedReservation = {
  locator: 'ITN-BCN-20426',
  purchaseDate: '20 de abril de 2026',
  status: 'Confirmada',
  paymentStatus: 'Pago aprobado',
  itinerary: itineraries[0],
  travelers: 2,
  traveler: {
    firstName: 'Clara',
    lastName: 'Montes',
    email: 'clara.montes@example.com',
    phone: '+34 612 458 903',
    country: 'España',
    preferences: 'Ritmo tranquilo, restaurantes con opciones vegetarianas.',
  },
  documents: [
    { title: 'Confirmación de reserva', status: 'Disponible', type: 'PDF' },
    { title: 'Itinerario digital', status: 'Disponible', type: 'PDF' },
    { title: 'Mapa offline', status: 'Pendiente de envío', type: 'Archivo' },
  ],
  communications: [
    { date: '20 abr 2026, 19:42', title: 'Reserva confirmada', detail: 'Email enviado con el localizador ITN-BCN-20426.' },
    { date: '20 abr 2026, 19:41', title: 'Pago aprobado', detail: 'Validación reforzada completada por el banco emisor.' },
    { date: '20 abr 2026, 19:39', title: 'Datos revisados', detail: 'El viajero aceptó condiciones y política de cancelación.' },
  ],
}
