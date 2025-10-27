export const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
export const EXERCISE_MAX_LENGTH = 3;

export const RatingRange = {
  Min: 1,
  Max: 5
} as const;
export const PasswordLength = {
  Min: 6,
  Max: 12
} as const;
export const NameLength = {
  Min: 1,
  Max: 15
} as const;
export const DescriptionLength = {
  Min: 10,
  Max: 140
} as const;
export const ContentLength = {
  Min: 100,
  Max: 1024
} as const;
export const ExperienceLength = {
  Min: 10,
  Max: 140
} as const;
export const CaloriesRange = {
  Min: 1000,
  Max: 5000
} as const;

export const EMPTY_FIELD_ERROR = 'Заполните поле.';
export const FIELD_VALUE_ERROR = 'Поле должно содержать от %min% до %max% символов.';
export const EMAIL_FIELD_ERROR = 'Некорректный email адрес.';
export const PRICE_FIELD_ERROR = 'Стоимость тренировки, целое число больше или равное 0.';
export const CALORIES_FIELD_ERROR = 'Количество калорий, целое число больше или равное %min% и меньше или равное %max%.';
export const FIELD_VALUE_TYPE_ERROR = 'Укажите одно из значений: %values%';
export const EXERCISE_MAX_LENGTH_ERROR = `Максимальное количество элементов не более ${EXERCISE_MAX_LENGTH}`;
