import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {ConfigAppModule} from '@1770169-fitfriends/config';
import {getMongooseOptions} from '@1770169-fitfriends/helpers';

import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {FilesModule} from './files/files.module';
import {TrainingModule} from './training/training.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    FilesModule,
    TrainingModule,
    ConfigAppModule,
    MongooseModule.forRootAsync(getMongooseOptions('mongoConfig'))
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
