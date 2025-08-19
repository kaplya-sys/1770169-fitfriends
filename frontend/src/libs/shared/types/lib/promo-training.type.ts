import {PromoType} from './promo-type';
import {TrainingType} from './training.type';

export type PromoTraining = TrainingType & Omit<PromoType, 'trainingId'>;
