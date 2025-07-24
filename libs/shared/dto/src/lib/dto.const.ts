export const EMAIL_PROPERTY = {
  DESCRIPTION: 'Уникальный адрес электронной почты для аутентификация пользователя.',
  EXAMPLE: 'user@mail.ru',
  TYPE: String
}
export const NAME_PROPERTY = {
  DESCRIPTION: 'Имя пользователя',
  EXAMPLE: 'Андрей',
  MIN: 1,
  MAX: 15,
  TYPE: String
}
export const PASSWORD_PROPERTY = {
  DESCRIPTION: 'Пароль для аутентификация пользователя.',
  EXAMPLE: '123456',
  MIN: 5,
  MAX: 12,
  TYPE: String
}
export const ROLE_PROPERTY = {
  DESCRIPTION: 'Тип пользователя: "admin" или "user".',
  EXAMPLE: 'admin',
  ENUM: ['admin', 'user']
}
export const PRODUCT_TITLE_PROPERTY = {
  DESCRIPTION: 'Наименование товара.',
  EXAMPLE: 'Акустическая гитара Yamaha F310',
  MIN: 10,
  MAX: 100,
  TYPE: String
}
export const PRODUCT_ARTICLE_PROPERTY = {
  DESCRIPTION: 'Артикул товара.',
  EXAMPLE: 'SO754565',
  MIN: 5,
  MAX: 40,
  TYPE: String
}
export const PRODUCT_DESCRIPTION_PROPERTY = {
  DESCRIPTION: 'Описание товара.',
  EXAMPLE: 'Акустическая гитара Yamaha F310 с теплым звуком и удобной игрой. Отличный выбор для начинающих.',
  MIN: 20,
  MAX: 1024,
  TYPE: String
}
export const PRODUCT_PRICE_PROPERTY = {
  DESCRIPTION: 'Цена товара.',
  EXAMPLE: '25000',
  MIN: 100,
  MAX: 1000000,
  TYPE: Number
}
export const PRODUCT_CREATE_DATE_PROPERTY = {
  DESCRIPTION: 'Дата добавления товара.',
  EXAMPLE: '11.07.2025',
  FORMAT: 'date',
  TYPE: String
}
export const PRODUCT_TYPE_PROPERTY = {
  DESCRIPTION: 'Тип продукта: "acoustic", "electro" или "ukulele".',
  EXAMPLE: 'electro',
  ENUM: ['acoustic', 'electro', 'ukulele']
}
export const PRODUCT_STRINGS_PROPERTY = {
  DESCRIPTION: 'Количество струн: "four", "six", "seven" или "twelve".',
  EXAMPLE: 'six',
  ENUM: ['four', 'six', 'seven', 'twelve']
}
