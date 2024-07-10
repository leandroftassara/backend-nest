import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExcludeUserPasswordInterceptor } from './shared/exclude-user-password.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativa validação dos requests a partir dos DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Usa o interceptador de remover a senha de objetos usuários
  app.useGlobalInterceptors(new ExcludeUserPasswordInterceptor());

  await app.listen(3000);
}

bootstrap();
