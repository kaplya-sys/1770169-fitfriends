import {createAction} from '@reduxjs/toolkit';

import {RedirectPayload} from '../libs/shared/types';

export const redirectToRoute = createAction<RedirectPayload>('app/redirectToRoute');
