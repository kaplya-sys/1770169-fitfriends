import {Middleware} from '@reduxjs/toolkit';

import {RootState} from '../store';
import {browserHistory} from '../../libs/browser-history';
import {AppRouteType} from '../../libs/shared/types';
import {isRedirectAction} from '../../libs/shared/helpers';

export const redirect: Middleware<unknown, RootState> = () => (next) => (action: unknown) => {
  if (isRedirectAction(action)) {
    if (action.type === 'app/redirectToRoute') {
      let path = action.payload.route;

      if (action.payload.params) {
        Object.entries(action.payload.params).forEach(([key, value]) => {
          path = path.replace(`:${key}`, String(value)) as AppRouteType;
        });
      }

      browserHistory.push(path);
    }
  }

  return next(action);
};
