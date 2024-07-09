import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { Utils } from 'src/shared/utils';
import { CreateUserService } from './create-user/create-user.service';
import { Mailer } from 'src/shared/mailer';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/shared/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [Utils, CreateUserService, Mailer, UsersRepository, PrismaService],
})
export class UsersModule {}
