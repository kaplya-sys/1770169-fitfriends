export const Role = {
  User: 'user',
  Coach: 'coach'
} as const;

export type RoleType = (typeof Role)[keyof typeof Role];
