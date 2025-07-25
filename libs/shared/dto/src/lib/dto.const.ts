export const EMAIL_PROPERTY = {
  DESCRIPTION: 'Уникальный адрес электронной почты для аутентификация пользователя.',
  EXAMPLE: 'user@mail.ru',
  TYPE: String
}
export const NAME_PROPERTY = {
  DESCRIPTION: 'Имя пользователя.',
  EXAMPLE: 'Андрей',
  MIN: 1,
  MAX: 15,
  TYPE: String
}
export const PASSWORD_PROPERTY = {
  DESCRIPTION: 'Пароль для аутентификация пользователя.',
  EXAMPLE: '123456',
  MIN: 6,
  MAX: 12,
  TYPE: String
}
export const ROLE_PROPERTY = {
  DESCRIPTION: 'Тип пользователя: "user" или "coach".',
  EXAMPLE: 'user',
  ENUM: ['admin', 'user']
}
export const GENDER_PROPERTY = {
  DESCRIPTION: 'Пол пользователя: "female", "male" или "whatever".',
  EXAMPLE: 'female',
  ENUM: ['female', 'male', 'whatever']
}
export const LOCATION_PROPERTY = {
  DESCRIPTION: 'Станция метро: "petrogradskaya", "pionerskaya", "sportivnaya", "udelnaya" или "zvezdnaya".',
  EXAMPLE: 'petrogradskaya',
  ENUM: ['petrogradskaya', 'pionerskaya', 'sportivnaya', 'udelnaya', 'zvezdnaya']
}
export const FITNESS_LEVEL_PROPERTY = {
  DESCRIPTION: 'Уровень физической подготовки пользователя: "beginner", "amateur" или "professional".',
  EXAMPLE: 'beginner',
  ENUM: ['beginner', 'amateur', 'professional']
}
export const TRAINING_TIME_PROPERTY = {
  DESCRIPTION: 'Время на тренировку: "short", "medium", "long" или "extraLong".',
  EXAMPLE: 'short',
  ENUM: ['short', 'medium', 'long', 'extraLong']
}
export const EXERCISE_PROPERTY = {
  DESCRIPTION: 'Тип тренировок: "yoga", "running", "boxing", "stretching", "crossfit", "aerobics" или "pilates".',
  EXAMPLE: ['yoga', 'boxing', 'crossfit'],
  ENUM: ['yoga', 'running', 'boxing', 'stretching', 'crossfit', 'aerobics', 'pilates'],
  TYPE: String,
  MAX_ITEMS: 3
}
export const BIRTHDAY_PROPERTY = {
  DESCRIPTION: 'Дата рождения пользователя.',
  EXAMPLE: '2025-07-19T14:30:00',
  FORMAT: 'ISO8601',
  TYPE: String
}
export const CALORIE_PROPERTY = {
  DESCRIPTION: 'Количество калорий.',
  EXAMPLE: 3000,
  MIN: 1000,
  MAX: 5000,
  TYPE: Number
}
export const CALORIE_LOSE_PROPERTY = {
  DESCRIPTION: 'Количество калорий для сброса.',
  EXAMPLE: 4000,
  MIN: 1000,
  MAX: 5000,
  TYPE: Number
}
export const CALORIE_WASTE_PROPERTY = {
  DESCRIPTION: 'Количество калорий для траты в день.',
  EXAMPLE: 1500,
  MIN: 1000,
  MAX: 5000,
  TYPE: Number
}
export const EXPERIENCE_PROPERTY = {
  DESCRIPTION: 'Опыт пользователя.',
  EXAMPLE: 'Я профессиональный тренер по боксу.',
  MIN: 20,
  MAX: 140,
  TYPE: String
}
export const PERSONAL_TRAINING_PROPERTY = {
  DESCRIPTION: 'Возможно ли индивидуальные тренировки.',
  EXAMPLE: true,
  TYPE: Boolean
}
export const READY_PROPERTY = {
  DESCRIPTION: 'Готовность к тренировкам.',
  EXAMPLE: true,
  TYPE: Boolean
}
export const TITLE_PROPERTY = {
  DESCRIPTION: 'Наименование товара.',
  EXAMPLE: 'Акустическая гитара Yamaha F310',
  MIN: 10,
  MAX: 100,
  TYPE: String
}
export const DESCRIPTION_PROPERTY = {
  DESCRIPTION: 'Описание товара.',
  EXAMPLE: 'Акустическая гитара Yamaha F310 с теплым звуком и удобной игрой. Отличный выбор для начинающих.',
  MIN: 20,
  MAX: 1024,
  TYPE: String
}
export const PRICE_PROPERTY = {
  DESCRIPTION: 'Цена товара.',
  EXAMPLE: 25000,
  MIN: 100,
  MAX: 1000000,
  TYPE: Number
}

