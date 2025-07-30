export enum Route {
  AuthCheck = 'check-token',
  Create = 'create',
  DeleteTraining = ':id/delete',
  EditTraining = ':id/edit',
  EditUser = ':userId/edit',
  Login = 'sign-in',
  Register = 'sign-up',
  RefreshToken = 'refresh-token',
  Trainings = '/',
  Training = ':id',
  User = ':userId'
};
