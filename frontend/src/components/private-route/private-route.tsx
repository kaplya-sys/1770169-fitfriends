import {PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';

import {AppRouteType} from '../../libs/shared/types';

export type PrivateRouteProps = PropsWithChildren<{
  authorizationStatus?: boolean;
  roleStatus?: boolean;
  appRoute: AppRouteType;
}>;

export const PrivateRoute = ({
  authorizationStatus = true,
  roleStatus = true,
  appRoute,
  children
}: PrivateRouteProps) => authorizationStatus && roleStatus ? children : <Navigate to={appRoute}/>;
