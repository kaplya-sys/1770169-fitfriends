import {INestApplication} from '@nestjs/common';

import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

import {Project} from './swagger.constant';

export function createSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(Project.NAME)
    .setDescription(Project.DESCRIPTION)
    .setVersion(Project.VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Project.PATH, app, document);
}
