import {LoaderFunctionArgs, RouteObject} from 'react-router-dom';

import {PrivateRoute} from '../../components/private-route';
import {Products} from '../../pages/products';
import {SignUp} from '../../pages/sign-up';
import {SignIn} from '../../pages/sign-in';
import {Product} from '../../pages/product';
import {AddProduct} from '../../pages/add-product/add-product';
import {EditProduct} from '../../pages/edit-product/edit-product';
import {NotFound} from '../../pages/not-found';
import {BREADCRUMBS_NAMES} from '../shared/constant';
import {AppRoute, NameSpace, Params} from '../shared/types';
import {Layout} from '../../components/layout';
import {getGuitarAction, store} from '../../store';

const productLoader = async({params}: LoaderFunctionArgs<Params>) => {
  await store.dispatch(getGuitarAction({id: params.id}));
  return store.getState()[NameSpace.Guitar];
};

export const routes: RouteObject[] = [
  {
    element: <Layout/>,
    children: [
      {
        path: AppRoute.SignIn,
        element: <SignIn/>,
        handle: BREADCRUMBS_NAMES.login
      },
      {
        path: AppRoute.SignUp,
        element: <SignUp/>,
        handle: BREADCRUMBS_NAMES.registration
      },
      {
        path: AppRoute.Products,
        element: (
          <PrivateRoute isAdminOnly={true}>
            <Products/>
          </PrivateRoute>
        ),
        children: [
          {
            path: AppRoute.Product,
            element: <Product/>,
            loader: productLoader,
            lazy: () => import('../../pages/product').then(module => ({Component: module.Product})),
            handle: BREADCRUMBS_NAMES.product
          },
          {
            path: AppRoute.AddProduct,
            element: <AddProduct/>,
            handle: BREADCRUMBS_NAMES.addProduct
          },
          {
            path: AppRoute.EditProduct,
            element: <EditProduct/>,
            handle: BREADCRUMBS_NAMES.editProduct
          },
        ],
      },
      {
        path: AppRoute.NotFound,
        element: <NotFound/>,
      },
    ],
  }
];

