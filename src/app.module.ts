import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule],
  providers: [],
  exports: [],
})
export class AppModule {}
