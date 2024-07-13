import { Module } from '@nestjs/common';
// import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './api/accounts/accounts.module';

@Module({
  imports: [
    // Carrega variaveis de ambiente
    ConfigModule.forRoot({ isGlobal: true }),
    // Carrega módulos da aplicação
    AccountsModule,
    // UsersModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
