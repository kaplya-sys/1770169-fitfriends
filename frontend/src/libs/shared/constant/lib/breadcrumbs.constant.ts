import {AppRouteName} from '../../types';

export const BREADCRUMBS_NAMES: Record<AppRouteName, string> = {
  [AppRouteName.Home]: 'Главная',
  [AppRouteName.Login]: 'Вход',
  [AppRouteName.Registration]: 'Регистрация',
  [AppRouteName.Products]: 'Товары',
  [AppRouteName.Product]: 'Товар',
  [AppRouteName.AddProduct]: 'Новый товар',
  [AppRouteName.EditProduct]: 'Редактировать товар',
  [AppRouteName.Catalog]: 'Каталог'
};
