import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useValidationPipe(app);
  useSwagger(app);

  await app.listen(3000);

  function useValidationPipe(app: INestApplication): void {
    const pipe = new ValidationPipe();
    app.useGlobalPipes(pipe);
  }

  function useSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Bave NestJS API')
      .setDescription('API Description')
      .setVersion('1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'Bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .build();
  }
}
bootstrap();
