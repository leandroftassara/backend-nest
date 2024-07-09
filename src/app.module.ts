import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './api/accounts/accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AccountsModule,
    UsersModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
