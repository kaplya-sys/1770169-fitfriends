export const AppRoute = {
  Balance: '/users/:id/balance',
  CreateTraining: '/trainings/new',
  CreateFeedback: 'create-feedback',
  Intro: '/intro',
  Feedbacks: '/trainings/:id/feedbacks',
  Home: '/',
  Login: '/sign-in',
  MyFriends: '/users/:id/friends',
  MyOrders: '/users/:id/orders',
  MyPurchases: '/users/:id/purchases',
  PersonalAccount: '/users/:id',
  Questionnaire: '/users/:id/questionnaire',
  Register: '/sign-up',
  Training: '/trainings/:id',
  Trainings: '/trainings',
  Users: '/users'
} as const;

export type AppRouteType = (typeof AppRoute)[keyof typeof AppRoute];
