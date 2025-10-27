export const Station = {
  Pionerskaya: 'pionerskaya',
  Petrogradskaya: 'petrogradskaya',
  Udelnaya: 'udelnaya',
  Zvezdnaya: 'zvezdnaya',
  Sportivnaya: 'sportivnaya'
} as const;

export type StationType = (typeof Station)[keyof typeof Station];
