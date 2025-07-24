import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {ConfigAppModule} from '@1770169-guitar/config';
import {getMongooseOptions} from '@1770169-guitar/helpers';

import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {FilesModule} from './files/files.module';
import {ProductsModule} from './products/products.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    FilesModule,
    ProductsModule,
    ConfigAppModule,
    MongooseModule.forRootAsync(getMongooseOptions('mongoConfig'))
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
