export const SortDirection = {
  Up: 'asc',
  Down: 'desc'
} as const;

export type SortDirectionType = (typeof SortDirection)[keyof typeof SortDirection];
