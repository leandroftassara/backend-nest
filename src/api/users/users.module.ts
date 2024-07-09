import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { Utils } from 'src/shared/utils';
import { CreateUserModule } from './create-user/create-user.module';

@Module({
  imports: [CreateUserModule],
  controllers: [UsersController],
  providers: [Utils],
})
export class UsersModule {}
