export const NOT_FOUND_BY_ID_MESSAGE ='Тренировка с идентификатором: %id% не найдена.';
export const SERVER_ERROR_MESSAGE = 'Не удалось обновить тренировку из-за ошибки сервера.';
export const ELEMENTS_ON_PAGE = 50;
export const MAX_UPLOAD_FILES = 1;
export const DEFAULT_PAGE_COUNT = 1;
export const ROUTE_PREFIX = 'trainings';
export const TAG = 'Trainings';

export const PRODUCT_CREATED_RESPONSE = 'Созданный объект товара.';
export const PRODUCT_UPDATED_RESPONSE = 'Обновленный объект товара.';
export const PRODUCTS_FOUND_RESPONSE = 'Объект пагинации, включающий массив товаров отсортированных по дате возрастания.';
export const PRODUCT_FOUND_RESPONSE = 'Найденный объект товара.';
export const PRODUCT_DELETED_RESPONSE = 'Товар успешно удален.';

export const PRODUCT_TYPE_QUERY = {
  NAME: 'types',
  DESCRIPTION: 'Фильтрация товаров по типу.',
  EXAMPLE: ['acoustic', 'ukulele'],
  ENUM: ['acoustic', 'electro', 'ukulele']
}
export const PRODUCT_STRINGS_QUERY = {
  NAME: 'strings',
  DESCRIPTION: 'Фильтрация товаров по количеству струн.',
  EXAMPLE: ['four', 'twelve'],
  ENUM: ['four', 'six', 'seven', 'twelve']
}
export const PRODUCT_PRICE_QUERY = {
  NAME: 'price',
  DESCRIPTION: 'Сортировка товаров по цене.',
  EXAMPLE: 'asc',
  ENUM: ['asc', 'desc']
}
export const PRODUCT_DATE_QUERY = {
  NAME: 'date',
  DESCRIPTION: 'Сортировка товаров по дате добавления.',
  EXAMPLE: 'desc',
  ENUM: ['asc', 'desc']
}

export const PRODUCT_ID_PARAM = {
  NAME: 'id',
  DESCRIPTION: 'Идентификатор товара',
  EXAMPLE: '123e4567-e89b-12d3-a456-426614174000',
}
