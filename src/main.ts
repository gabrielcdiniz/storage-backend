import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const {
    SERVER_PORT,
  } = process.env;

  const app = await NestFactory.create(AppModule);
  await app.listen(SERVER_PORT);
}
bootstrap();
