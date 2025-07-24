import {
  ARTICLE_FIELD_ERROR,
  ArticleLength,
  EMAIL_FIELD_ERROR,
  EMAIL_REGEX,
  EMPTY_FIELD_ERROR,
  GUITAR_DESCRIPTION_FIELD_ERROR,
  GUITAR_TITLE_FIELD_ERROR,
  GUITAR_PRICE_FIELD_ERROR,
  GuitarDescriptionLength,
  GuitarNameLength,
  GuitarPriceLength,
  NAME_FIELD_ERROR,
  NameLength,
  PASSWORD_FIELD_ERROR,
  PasswordLength
} from '../../constant';
import {Validator} from '../../types';

const validatePassword = (password: string): string | null => {
  if (!password.length) {
    return EMPTY_FIELD_ERROR;
  }

  if (password.length < PasswordLength.Min || password.length > PasswordLength.Max) {
    return PASSWORD_FIELD_ERROR;
  }

  return null;
};

const validateName = (name: string): string | null => {
  if (!name.length) {
    return EMPTY_FIELD_ERROR;
  }

  if (name.length < NameLength.Min || name.length > NameLength.Max) {
    return NAME_FIELD_ERROR;
  }

  return null;
};

const validateEmail = (email: string): string | null => {
  if (!email.length) {
    return EMPTY_FIELD_ERROR;
  }

  if (!EMAIL_REGEX.test(email)) {
    return EMAIL_FIELD_ERROR;
  }

  return null;
};

const validateGuitarTitle = (title: string): string | null => {
  if (!title.length) {
    return EMPTY_FIELD_ERROR;
  }

  if (title.length < GuitarNameLength.Min || title.length > GuitarNameLength.Max) {
    return GUITAR_TITLE_FIELD_ERROR;
  }

  return null;
};

const validateGuitarDescription = (description: string): string | null => {
  if (!description.length) {
    return EMPTY_FIELD_ERROR;
  }

  if (description.length < GuitarDescriptionLength.Min || description.length > GuitarDescriptionLength.Max) {
    return GUITAR_DESCRIPTION_FIELD_ERROR;
  }

  return null;
};

const validateGuitarPrice = (price: string): string | null => {
  const value = parseInt(price, 10);

  if (!price.length) {
    return EMPTY_FIELD_ERROR;
  }

  if (value < GuitarPriceLength.Min || value > GuitarPriceLength.Max) {
    return GUITAR_PRICE_FIELD_ERROR;
  }

  return null;
};

const validateArticle = (value: string): string | null => {
  if (!value.length) {
    return EMPTY_FIELD_ERROR;
  }

  if (value.length < ArticleLength.Min || value.length > ArticleLength.Max) {
    return ARTICLE_FIELD_ERROR;
  }

  return null;
};

const validateDate = (date: string): string | null => {
  if (!date.length) {
    return EMPTY_FIELD_ERROR;
  }

  return null;
};

const validator: Validator = {
  name: validateName,
  email: validateEmail,
  password: validatePassword,
  date: validateDate,
  title: validateGuitarTitle,
  price: validateGuitarPrice,
  article: validateArticle,
  description: validateGuitarDescription
};

export const validateFields = <T extends object>(fields: T): Partial<Record<keyof T, string>> | null => {
  const newError: Partial<Record<keyof T, string>> = {};

  Object.entries(fields).forEach(([key, value]) => {
    const validate = validator[key];

    if (validate) {
      const result = validate(value);

      if(result) {
        newError[key as keyof T] = result || '';
      }
    }
  });

  if (Object.keys(newError).length) {
    return newError;
  }

  return null;
}
