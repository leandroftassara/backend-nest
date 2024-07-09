import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { Utils } from 'src/shared/utils';
import { CreateUserService } from './create-user/create-user.service';
import { Mailer } from 'src/shared/mailer';

@Module({
  controllers: [UsersController],
  providers: [Utils, CreateUserService, Mailer],
})
export class UsersModule {}
