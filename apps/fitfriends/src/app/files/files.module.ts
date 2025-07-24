import {ConfigService} from '@nestjs/config';
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ServeStaticModule} from '@nestjs/serve-static';

import {SERVE_ROOT} from './files.constant';
import {FilesService} from './files.service';
import {FilesRepository} from './files.repository';
import {FilesModel, FilesSchema} from './files.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{name: FilesModel.name, schema: FilesSchema}]
    ),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('filesConfig.uploadDirectory');

        return [{
          rootPath,
          serveRoot: SERVE_ROOT,
          serveStaticOptions: {
            fallthrough: true,
            etag: true
          }
        }]
      }
    })
  ],
  controllers: [],
  providers: [FilesService, FilesRepository],
  exports: [FilesService, FilesRepository]
})

export class FilesModule {}
