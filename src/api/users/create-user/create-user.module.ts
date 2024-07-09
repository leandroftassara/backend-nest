import { Module } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { Mailer } from 'src/shared/mailer';
import { UsersRepository } from '../users.repository';
import { PrismaService } from 'src/shared/prisma.service';
import { Utils } from 'src/shared/utils';

@Module({
  providers: [CreateUserService, Utils, Mailer, UsersRepository, PrismaService],
  exports: [CreateUserService],
})
export class CreateUserModule {}
