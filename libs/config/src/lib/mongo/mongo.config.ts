import {registerAs} from '@nestjs/config';

import {getMongooseConfig} from '@1770169-fitfriends/helpers';

export const MongoConfig = registerAs('mongoConfig', getMongooseConfig);
