import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config(); // Cargar variables de entorno

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  /*Temporal para que no arroje error de cors */
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
  });

  app.use(
    '/uploads',
    express.static(path.join(__dirname, '..', '..', '..', 'uploads')),
  );
  await app.listen(process?.env?.APP_PORT || 3000);
}
bootstrap();
