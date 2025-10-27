export const USER_EXISTS_MESSAGE = 'Пользователь с данным адресом электронной почты: %email% уже зарегистрирован в системе.';
export const STATION_NO_EXISTS_MESSAGE = 'Станция метро: %station% не найдена в системе.';
export const NOT_FOUND_STATION_BY_ID_MESSAGE = 'Станция метро с данным идентификатором: %id% не найдена в системе.';
export const NOT_FOUND_BY_EMAIL_MESSAGE = 'Пользователь с данным адресом электронной почты: %email% не найден в системе.';
export const NOT_FOUND_BY_ID_MESSAGE = 'Пользователь с данным идентификатором: %id% не найден в системе.';
export const NOT_FOUND_QUESTIONNAIRE_MESSAGE = 'Анкета с данным идентификатором: %id% не найден в системе.';
export const NOT_FOUND_FRIEND_MESSAGE = 'Запись с данным идентификатором: %id% не найден в системе.';
export const QUESTIONNAIRE_EXISTS_MESSAGE = 'У пользователь с идентификатором: %id% уже заполнена анкета.';
export const NOT_FOUND_BALANCE_BY_ID_MESSAGE = 'Баланс пользователя с данным идентификатором тренировки: %id% не найден в системе.';
export const UPDATE_USER_ERROR_MESSAGE = 'Не удалось обновить пользователя из-за ошибки сервера.';
export const UPDATE_USER_BALANCE_ERROR_MESSAGE = 'Не удалось обновить баланс пользователя из-за ошибки сервера.';
export const ID_ERROR_MESSAGE = 'Не верный идентификатор.';
export const WRONG_PASSWORD_MESSAGE = 'Введен неверный пароль.';
export const TOKEN_CREATION_ERROR = 'Ошибка при создании токена.'
export const TOKEN_GENERATE_ERROR = '[Ошибка генерации токена]: %error%'
export const ROUTE_PREFIX = 'users';
export const TAG = 'Users';
export const MAX_UPLOAD_FILES = 1;
export const DEFAULT_AMOUNT = 1;
export const DATA_TYPE = 'multipart/form-data';
export const USER_APPLICATION_MESSAGE = '%user% добавил(а) вас в друзья';

export const CREATED_RESPONSE = 'Объект успешно создан.';
export const UPDATED_RESPONSE = 'Объект успешно обновлен.';
export const FOUND_RESPONSE = 'Объект успешно найден.';
export const DELETE_RESPONSE = 'Объект успешно удален.';
export const AUTHORIZED_RESPONSE = 'Успешная авторизация пользователя.';
export const REFRESH_TOKEN_RESPONSE = 'Успешное обновление токена.';
export const CHECK_TOKEN_RESPONSE = 'Успешная проверка пользователя.';

export const NOT_FOUND_RESPONSE = 'Объект не найден.';
export const CONFLICT_RESPONSE = 'Объект уже существует.';
export const BAD_REQUEST_RESPONSE = 'Некорректные данные.';
export const UNAUTHORIZED = 'Ошибка авторизации пользователя.'

export const ID_PARAM = {
  NAME: 'id',
  DESCRIPTION: 'UUID идентификатор.',
  EXAMPLE: '123e4567-e89b-12d3-a456-426614174000',
}
export const USER_ID_PARAM = {
  NAME: 'userId',
  DESCRIPTION: 'UUID идентификатор пользователя.',
  EXAMPLE: '123e4567-e89b-12d3-a456-426614174000',
}
export const FILE_ID_PARAM = {
  NAME: 'fileId',
  DESCRIPTION: 'Mongo ObjectId идентификатор.',
  EXAMPLE: '64a7086e40e1f7c9a3f9d875',
}
export const FRIEND_ID_PARAM = {
  NAME: 'friendId',
  DESCRIPTION: 'UUID идентификатор пользователя.',
  EXAMPLE: '123e4567-e89b-12d3-a456-426614174000',
}
export const TRAINING_ID_PARAM = {
  NAME: 'trainingId',
  DESCRIPTION: 'UUID идентификатор тренировки.',
  EXAMPLE: '123e4567-e89b-12d3-a456-426614174000',
}
export const ROLE_QUERY = {
  NAME: 'role',
  DESCRIPTION: 'Фильтрация пользователей по типу.',
  EXAMPLE: 'user',
  ENUM: ['coach', 'user']
}
export const TYPE_QUERY = {
  NAME: 'type',
  DESCRIPTION: 'Фильтрация пользователей по типу упражнения.',
  ENUM: ['yoga', 'running', 'boxing', 'stretching', 'crossfit', 'aerobics', 'pilates'],
  EXAMPLE: ['yoga', 'boxing', 'crossfit'],
}
export const STATION_QUERY = {
  NAME: 'station',
  DESCRIPTION: 'Фильтрация пользователей по локации станции метро.',
  ENUM: ['pionerskaya', 'petrogradskaya', 'udelnaya', 'zvezdnaya', 'sportivnaya'],
  EXAMPLE: ['pionerskaya', 'petrogradskaya'],
}
export const FITNESS_LEVEL_QUERY = {
  NAME: 'fitnessLevel',
  DESCRIPTION: 'Фильтрация пользователей по уровню подготовки.',
  ENUM: ['beginner', 'amateur', 'professional'],
  EXAMPLE: 'amateur',
}
export const LIMIT_QUERY = {
  NAME: 'limit',
  DESCRIPTION: 'Количество элементов на странице.',
  EXAMPLE: 25,
}
export const PAGE_QUERY = {
  NAME: 'page',
  DESCRIPTION: 'Страница с элементами.',
  EXAMPLE: 2,
}
export const ACTIVE_QUERY = {
  NAME: 'active',
  DESCRIPTION: 'Флаг указывающий только на доступные тренировки.',
  EXAMPLE: true,
}
