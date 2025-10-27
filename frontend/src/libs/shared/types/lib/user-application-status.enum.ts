export const UserApplicationStatus = {
  Pending: 'pending',
  Rejected: 'rejected',
  Accepted: 'accepted'
} as const;

export type UserApplicationStatusType = (typeof UserApplicationStatus)[keyof typeof UserApplicationStatus];
