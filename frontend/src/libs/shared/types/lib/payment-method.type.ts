export const PaymentMethod = {
  Visa: 'visa',
  Mir: 'mir',
  Umoney: 'umoney'
};

export type PaymentMethodType = (typeof PaymentMethod)[keyof typeof PaymentMethod];
