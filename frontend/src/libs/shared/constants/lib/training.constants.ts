import {
  Exercise,
  ExerciseType,
  Gender,
  GenderType,
  FitnessLevel,
  FitnessLevelType,
  Station,
  StationType,
  TrainingTime,
  TrainingTimeType,
  RoleType,
  Role
} from '../../types';

export const EXERCISE_NAMES: Record<ExerciseType, string> = {
  [Exercise.Yoga]: 'Йога',
  [Exercise.Crossfit]: 'Кроссфит',
  [Exercise.Boxing]: 'Бокс',
  [Exercise.Running]: 'Бег',
  [Exercise.Aerobics]: 'Аэробика',
  [Exercise.Pilates]: 'Пилатес',
  [Exercise.Stretching]: 'Стрейчинг',
} as const;

export const TRAINING_TIME_NAMES: Record<TrainingTimeType, string> = {
  [TrainingTime.Short]: '10-30',
  [TrainingTime.Medium]: '30-50',
  [TrainingTime.Long]: '50-80',
  [TrainingTime.ExtraLong]: '80-100',
} as const;

export const TRAINING_TIME_SECOND_NAMES: Record<TrainingTimeType, string> = {
  [TrainingTime.Short]: '10_30',
  [TrainingTime.Medium]: '30_50',
  [TrainingTime.Long]: '50_80',
  [TrainingTime.ExtraLong]: '80_100',
} as const;

export const TRAINING_TIME_NAMES_WITH_LABEL: Record<TrainingTimeType, string> = {
  [TrainingTime.Short]: '10 мин - 30 мин',
  [TrainingTime.Medium]: '30 мин - 50 мин',
  [TrainingTime.Long]: '50 мин - 80 мин',
  [TrainingTime.ExtraLong]: '80 мин - 100 мин',
} as const;

export const STATION_NAME: Record<StationType, string> = {
  [Station.Pionerskaya]: 'Пионерская',
  [Station.Petrogradskaya]: 'Петроградская',
  [Station.Udelnaya]: 'Удельная',
  [Station.Zvezdnaya]: 'Звёздная',
  [Station.Sportivnaya]: 'Спортивная'
} as const;

export const GENDER_NAME: Record<GenderType, string> = {
  [Gender.Male]: 'Мужской',
  [Gender.Female]: 'Женский',
  [Gender.Whatever]: 'Неважно'
} as const;

export const GENDER_SECOND_VARIANT_NAME: Record<GenderType, string> = {
  [Gender.Male]: 'для_мужчин',
  [Gender.Female]: 'для_женщин',
  [Gender.Whatever]: 'для_всех'
} as const;

export const FITNESS_LEVEL_NAME: Record<FitnessLevelType, string> = {
  [FitnessLevel.Beginner]: 'Новичок',
  [FitnessLevel.Amateur]: 'Любитель',
  [FitnessLevel.Professional]: 'Профессионал'
} as const;

export const ROLE_NAME: Record<RoleType, string> = {
  [Role.User]: 'Пользователи',
  [Role.Coach]: 'Тренеры'
} as const;
