export const ApiRoute = {
  AuthCheck: '/users/check-token',
  CreateOrder: '/trainings/:id/create-order',
  CreateCoachQuestionnaire: '/users/:id/create-coach-questionnaire',
  CreateUserQuestionnaire: '/users/:id/create-user-questionnaire',
  CreateTraining: '/trainings/create',
  CreateTrainingFeedback: '/trainings/:id/create-feedback',
  DeleteTraining: '/trainings/:id/delete',
  DeleteUser: '/users/:id/delete',
  DeleteUserAvatar: '/users/:id/delete-avatar',
  EditTraining: '/trainings/:id/edit',
  EditUser: '/users/:id/edit',
  Login: '/users/sign-in',
  RangeFilters: '/trainings/range',
  Register: '/users/sign-up',
  RefreshToken: '/users/refresh-token',
  RecommendedTrainings: '/trainings/recommended-trainings',
  Trainings: '/trainings',
  Training: '/trainings/:id',
  TrainingFeedbacks: '/trainings/:id/feedbacks',
  User: '/users/:id',
  Users: '/users',
  UserBalance: '/users/:id/balance'
} as const;

export type ApiRouteType = (typeof ApiRoute)[keyof typeof ApiRoute];
