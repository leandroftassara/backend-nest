import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExcludeUserPasswordInterceptor } from './shared/exclude-user-password.interceptor';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

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

  // Swagger (Documentação)
  const config = new DocumentBuilder()
    .setTitle('Users Manager')
    .setDescription('Documentação da API de gestão de contas e usuários, criada a partir do framework Nest, como caso de estudo.')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);  
  SwaggerModule.setup('docs', app, document, {swaggerOptions: {
    defaultModelsExpandDepth: -1,
  },});

  // Inicializa o app
  await app.listen(3000);
}

bootstrap();
