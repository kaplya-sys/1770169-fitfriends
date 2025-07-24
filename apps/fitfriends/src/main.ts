/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {ConfigService} from '@nestjs/config';

import {createMessage} from '@1770169-guitar/helpers';
import {createSwagger} from '@1770169-guitar/swagger';

import {AppModule} from './app/app.module';
import {APP_RUN_MESSAGE, DEFAULT_PORT, PREFIX} from './constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = PREFIX;
  const configService = app.get(ConfigService);
  const port = configService.get<string>('appConfig.port') || DEFAULT_PORT;
  const hostname = configService.get<string>('appConfig.host');
  //createSwagger(app);
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });

  await app.listen(port);
  Logger.log(createMessage(APP_RUN_MESSAGE, [hostname, port, globalPrefix]));
}

bootstrap();
