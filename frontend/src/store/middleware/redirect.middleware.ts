import {Middleware, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../store';
import {browserHistory} from '../../libs/browser-history';
import {AppRoute, RedirectPayload} from '../../libs/shared/types-old';

const isRedirectAction = (action: unknown): action is PayloadAction<RedirectPayload> =>
  action !== null
    && typeof action === 'object'
    && 'type' in action
    && 'payload' in action;

export const redirect: Middleware<unknown, RootState> = () => (next) => (action: unknown) => {
  if (isRedirectAction(action)) {
    if (action.type === 'app/redirectToRoute') {
      let path = action.payload.route;

      if (action.payload.params) {
        Object.entries(action.payload.params).forEach(([key, value]) => {
          path = path.replace(`:${key}`, String(value)) as AppRoute;
        });
      }

      browserHistory.push(path);
    }
  }

  return next(action);
};
