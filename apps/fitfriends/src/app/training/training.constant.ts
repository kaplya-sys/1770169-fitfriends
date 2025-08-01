export const NOT_FOUND_BY_ID_MESSAGE ='Тренировка с идентификатором: %id% не найдена.';
export const SERVER_ERROR_MESSAGE = 'Не удалось обновить тренировку из-за ошибки сервера.';
export const ELEMENTS_ON_PAGE = 50;
export const MAX_UPLOAD_FILES = 1;
export const DEFAULT_PAGE_COUNT = 1;
export const ROUTE_PREFIX = 'trainings';
export const TAG = 'Trainings';

export const CREATED_RESPONSE = 'Объект успешно создан.';
export const UPDATED_RESPONSE = 'Объект успешно обновлен.';
export const FOUND_RESPONSE = 'Объект успешно найден.';
export const DELETED_RESPONSE = 'Объект успешно удален.';
export const NOT_FOUND_RESPONSE = 'Объект не найден.';
export const CONFLICT_RESPONSE = 'Объект уже существует.';
export const BAD_REQUEST_RESPONSE = 'Некорректные данные.';
export const UNAUTHORIZED = 'Ошибка авторизации пользователя.'

export const TRAINING_CALORIES_MAX_QUERY = {
  NAME: 'caloriesMin',
  DESCRIPTION: 'Фильтрация тренировок по количеству калорий, от минимального значения.',
  EXAMPLE: 1000,
  TYPE: Number
}
export const TRAINING_CALORIES_MIN_QUERY = {
  NAME: 'caloriesMax',
  DESCRIPTION: 'Фильтрация тренировок по количеству калорий, до максимального значения.',
  EXAMPLE: 5000,
  TYPE: Number
}
export const TRAINING_PRICE_MIN_QUERY = {
  NAME: 'priceMin',
  DESCRIPTION: 'Фильтрация тренировок по цене, от минимальной цены.',
  EXAMPLE: 0,
  TYPE: Number
}
export const TRAINING_PRICE_MAX_QUERY = {
  NAME: 'priceMax',
  DESCRIPTION: 'Фильтрация тренировок по цене, до максимальной цене.',
  EXAMPLE: 9000,
  TYPE: Number
}
export const TRAINING_PRICE_ORDER_QUERY = {
  NAME: 'orderByPrice',
  DESCRIPTION: 'Сортировка тренировок по цене.',
  EXAMPLE: 'asc',
  ENUM: ['asc', 'desc']
}
export const TRAINING_DATE_ORDER_QUERY = {
  NAME: 'orderByDate',
  DESCRIPTION: 'Сортировка тренировок по дате добавления.',
  EXAMPLE: 'desc',
  ENUM: ['asc', 'desc']
}
export const LIMIT_QUERY = {
  NAME: 'limit',
  DESCRIPTION: 'Количество элементов на странице.',
  EXAMPLE: 25,
  TYPE: Number
}
export const PAGE_QUERY = {
  NAME: 'page',
  DESCRIPTION: 'Страница с элементами.',
  EXAMPLE: 2,
  TYPE: Number
}
export const ID_PARAM = {
  NAME: 'id',
  DESCRIPTION: 'UUID идентификатор тренировки.',
  EXAMPLE: '123e4567-e89b-12d3-a456-426614174000',
}
