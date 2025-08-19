export const Location = {
  Pionerskaya: 'pionerskaya',
  Petrogradskaya: 'petrogradskaya',
  Udelnaya: 'udelnaya',
  Zvezdnaya: 'zvezdnaya',
  Sportivnaya: 'sportivnaya'
} as const;

export type LocationType = (typeof Location)[keyof typeof Location];
