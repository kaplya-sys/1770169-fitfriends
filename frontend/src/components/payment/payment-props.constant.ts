import { PaymentMethod } from '@fitfriends/lib/shared/types';

export const PAYMENT_OPTIONS = [
  {
    id: crypto.randomUUID(),
    name: 'payment-purchases',
    label: 'Visa.',
    value: PaymentMethod.Visa,
    width: 58,
    height: 20,
    logo: '#visa-logo'
  },
  {
    id: crypto.randomUUID(),
    name: 'payment-purchases',
    label: 'Мир.',
    value: PaymentMethod.Mir,
    width: 66,
    height: 20,
    logo: '#mir-logo'
  },
  {
    id: crypto.randomUUID(),
    name: 'payment-purchases',
    label: 'Iomoney.',
    value: PaymentMethod.Umoney,
    width: 106,
    height: 24,
    logo: '#iomoney-logo'
  },
];
