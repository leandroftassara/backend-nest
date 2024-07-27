import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExcludeUserPasswordInterceptor } from './shared/exclude-user-password.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setupRedoc } from './shared/redoc.middleware';

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
    .setDescription(
      'Documentação da API de gestão de contas e usuários, criada a partir do framework Nest, como caso de estudo.',
    )
    .setVersion('1.0.0')
    .addTag(
      'Accounts',
      'Gerencia toda a parte de registro de uma conta até a verificação da mesma, quando passa a ser considerada como um usuário dentro do sistema.',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });

  // Configuração do ReDoc
  setupRedoc(app);

  // Inicializa o app
  await app.listen(3000);
}

bootstrap();
