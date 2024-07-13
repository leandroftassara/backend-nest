import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CreateUserModule } from './create-user/create-user.module';
import { Utils } from '../../shared/utils';

@Module({
  imports: [CreateUserModule],
  controllers: [UsersController],
  providers: [Utils],
})
export class UsersModule {}
