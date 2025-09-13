import {PromoTraining, PromoType, TrainingType} from '../../types';
import {NO_FOUND_PARAM_ERROR, REGEX} from './helpers.constant';

export const getRouteWithParam = <T extends string>(route: T, param: Record<string, string | number | undefined>): T => {
  let path: T = route;

  for (const [key, value] of Object.entries(param)) {
    if (!value) {
      throw new Error(NO_FOUND_PARAM_ERROR);
    }
    path = path.replace(`:${key}`, value.toString()) as T;
  }

  return path;
};

export const addPromo = (trainings: TrainingType[], promotions: PromoType[]): PromoTraining[] => {
  const promoMap = new Map<string, PromoType>(
    promotions.map((promo) => [promo.trainingId, promo])
  );
  const promoTrainings = trainings.filter((training) => promoMap.has(training.id));

  return promoTrainings.map((promoTraining) => {
    const promo = promoMap.get(promoTraining.id) as PromoType;

    return {...promoTraining, promoText: promo.promoText, newPrice: promo.newPrice};
  });
};

export const createMessage = <T>(message: string, expressions: T[] = []): string => {
  if (!expressions.length) {
    return message.replace(REGEX, '').trim();
  }

  return expressions.reduce((accumulator: string, currentValue: T) => accumulator.replace(REGEX, String(currentValue)), message);
};

export const getWeekCalculation = (value: number | undefined): number => value ? value * 7 : 0;

export const formatNumber = (value = 0, locale = 'ru-Ru') => Intl.NumberFormat(locale).format(value);
