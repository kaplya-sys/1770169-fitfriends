export const ROLE_TYPE_ERROR = 'Заявки могут оставлять пользователи только с ролью "user"'
export const NOT_FOUND_USER_ERROR = 'Пользователь с таким идентификатором: %id% не найден в системе.';
export const NOT_FOUND_APPLICATION_ERROR = 'Заявка с таким идентификатором: %id% не найден в системе.';

export const ROUTE_PREFIX = 'applications';
export const TAG = 'Applications';

export const CREATED_RESPONSE = 'Объект успешно создан.';
export const UPDATED_RESPONSE = 'Объект успешно обновлен.';
export const FOUND_RESPONSE = 'Объект успешно найден.';
export const NOT_FOUND_RESPONSE = 'Объект не найден.';
export const BAD_REQUEST_RESPONSE = 'Некорректные данные.';
export const UNAUTHORIZED = 'Ошибка авторизации пользователя.'

export const APPLICATION_ID_PARAM = {
  NAME: 'applicationId',
  DESCRIPTION: 'UUID идентификатор.',
  EXAMPLE: '123e4567-e89b-12d3-a456-426614174000',
}

export const USER_APPLICATION = {
  INVITE_MESSAGE: '%user% пригласил(а) вас на тренировку',
  REJECT_MESSAGE: '%user% отклонил(a) приглашение на совместную тренировку',
  ACCEPT_MESSAGE: '%user% принял(a) приглашение на совместную тренировку'
}
