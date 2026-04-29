export const paymentMethods = [
  {
    id: 'card',
    label: 'Tarjeta',
    detail: 'Visa / Mastercard',
    badge: 'SCA compatible',
    default: true,
  },
  {
    id: 'apple-pay',
    label: 'Apple Pay',
    detail: 'Face ID y tarjeta guardada',
    badge: 'Tokenizado',
    default: false,
  },
  {
    id: 'google-pay',
    label: 'Google Pay',
    detail: 'Cuenta y tarjeta guardada',
    badge: 'Tokenizado',
    default: false,
  },
]
