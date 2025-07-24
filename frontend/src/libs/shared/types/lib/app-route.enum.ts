export enum AppRoute {
  Root = '/',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  Products = '/products',
  Product = ':id',
  AddProduct = 'add',
  EditProduct = ':id/edit',
  NotFound = '*'
}
