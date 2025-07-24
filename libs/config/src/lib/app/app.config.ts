import {registerAs} from '@nestjs/config';

import {getAppConfig} from '@1770169-fitfriends/helpers';

export const AppConfig = registerAs('appConfig', getAppConfig);
