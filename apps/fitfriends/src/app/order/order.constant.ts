export const ELEMENTS_ON_PAGE = 4;
export const DEFAULT_PAGE_COUNT = 1;
export const ROUTE_PREFIX = 'orders';
export const TAG = 'Orders';
export const NOT_FOUND_BY_ID_MESSAGE ='Заказ с данным идентификатором: %id% не найден в системе.';

export const BAD_REQUEST_RESPONSE = 'Некорректные данные.';
export const CREATED_RESPONSE = 'Объект успешно создан.';
export const FOUND_RESPONSE = 'Объект успешно найден.';
export const NOT_FOUND_RESPONSE = 'Объект не найден.';
export const UNAUTHORIZED = 'Ошибка авторизации пользователя.'

export const LIMIT_QUERY = {
  NAME: 'limit',
  DESCRIPTION: 'Количество элементов на странице.',
  EXAMPLE: 25
}
export const PAGE_QUERY = {
  NAME: 'page',
  DESCRIPTION: 'Страница с элементами.',
  EXAMPLE: 2
}
export const ID_PARAM = {
  NAME: 'id',
  DESCRIPTION: 'UUID идентификатор тренировки.',
  EXAMPLE: '123e4567-e89b-12d3-a456-426614174000',
}
export const ORDER_AMOUNT_ORDER_QUERY = {
  NAME: 'orderByAmount',
  DESCRIPTION: 'Сортировка заказов по сумме стоимости тренировок.',
  EXAMPLE: 'desc',
  ENUM: ['asc', 'desc']
}
export const ORDER_COUNT_ORDER_QUERY = {
  NAME: 'orderByCount',
  DESCRIPTION: 'Сортировка заказов по количеству приобретенных тренировок.',
  EXAMPLE: 'desc',
  ENUM: ['asc', 'desc']
}
export const USER_ID_QUERY = {
  NAME: 'userId',
  DESCRIPTION: 'Получение заказав по ID пользователя.',
  EXAMPLE: '123e4567-e89b-12d3-a456-426614174000'
}
