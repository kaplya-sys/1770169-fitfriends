import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {ENV_FILE_PATH} from './config.constant';
import {AppConfig} from './app/app.config';
import {JwtConfig} from './jwt/jwt.config';
import {MongoConfig} from './mongo/mongo.config';
import {FilesConfig} from './files/files.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        AppConfig,
        JwtConfig,
        MongoConfig,
        FilesConfig,
      ],
      envFilePath: ENV_FILE_PATH
    })
  ],
  providers: [],
  exports: []
})
export class ConfigAppModule {}
