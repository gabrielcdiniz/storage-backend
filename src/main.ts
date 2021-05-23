import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AppModule } from './app.module';

config();

async function bootstrap() {
  const {
    SERVER_PORT,
  } = process.env;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Storage Backend API')
    .setVersion('1.0')
    .setDescription('API for only Study Purposes, with technologies NestJS + GraphQL and TypeORM for backend')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(SERVER_PORT);
}
bootstrap();
