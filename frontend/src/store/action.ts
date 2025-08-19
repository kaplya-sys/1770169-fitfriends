import {createAction} from '@reduxjs/toolkit';

import {RedirectPayloadType} from '../libs/shared/types';

export const redirectToRoute = createAction<RedirectPayloadType>('app/redirectToRoute');
