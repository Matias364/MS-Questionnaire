import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*Temporal para que no arroje error de cors */
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false, 
  });
  await app.listen(process?.env?.APP_PORT || 3000);
}
bootstrap();
