export const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth:'NO_AUTH',
  Unknown: 'UNKNOWN'
} as const;

export type AuthorizationStatusType = (typeof AuthorizationStatus)[keyof typeof AuthorizationStatus];
