import {Module} from '@nestjs/common';

import {PrismaClientModule} from '@1770169-guitar/models';

import {ProductsController} from './products.controller';
import {ProductsService} from './products.service';
import {ProductsRepository} from './products.repository';
import {FilesModule} from '../files/files.module';
import {FilesService} from '../files/files.service';


@Module({
  imports: [PrismaClientModule, FilesModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, FilesService],
})
export class ProductsModule {}
