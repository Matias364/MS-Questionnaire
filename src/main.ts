import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilita CORS
  app.enableCors({
    origin: '*', // Permitir cualquier origen. En producción, deberías restringir esto.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: false, // Permitir el uso de credenciales, como cookies o encabezados de autenticación
  });
  await app.listen(process?.env?.APP_PORT || 3001);
  
}
bootstrap();
