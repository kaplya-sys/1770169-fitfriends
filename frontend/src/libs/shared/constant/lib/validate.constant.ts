export const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export const PasswordLength = {
  Min: 5,
  Max: 12
} as const;
export const NameLength = {
  Min: 1,
  Max: 15
} as const;
export const ArticleLength = {
  Min: 5,
  Max: 40
} as const;
export const GuitarNameLength = {
  Min: 10,
  Max: 100
} as const;
export const GuitarPriceLength = {
  Min: 100,
  Max: 1000000
} as const;
export const GuitarDescriptionLength = {
  Min: 20,
  Max: 1024
} as const;

export const EMPTY_FIELD_ERROR = 'Заполните поле';
export const NAME_FIELD_ERROR = `Имя должно содержать от ${NameLength.Min} до ${NameLength.Max} символов`;
export const EMAIL_FIELD_ERROR = 'Некорректный email адрес';
export const PASSWORD_FIELD_ERROR = `Пароль должен содержать от ${PasswordLength.Min} до ${PasswordLength.Max} символов`;
export const GUITAR_TITLE_FIELD_ERROR = `Имя гитары должно содержать от ${GuitarNameLength.Min} до ${GuitarNameLength.Max} символов`;
export const GUITAR_PRICE_FIELD_ERROR = `Диапазон цены на гитару от ${GuitarPriceLength.Min} до ${GuitarPriceLength.Max} ₽`;
export const GUITAR_DESCRIPTION_FIELD_ERROR = `Описание гитары должно содержать от ${GuitarDescriptionLength.Min} до ${GuitarDescriptionLength.Max} символов`;
export const ARTICLE_FIELD_ERROR = `Артикул товара гитары должно содержать от ${ArticleLength.Min} до ${ArticleLength.Max} символов`;
