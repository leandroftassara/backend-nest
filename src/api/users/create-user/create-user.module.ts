import { Module } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { UsersRepository } from '../users.repository';
import { PrismaService } from 'src/shared/prisma.service';
import { Utils } from 'src/shared/utils';
import { MailerService } from 'src/shared/mailer.service';

@Module({
  providers: [
    CreateUserService,
    Utils,
    MailerService,
    UsersRepository,
    PrismaService,
  ],
  exports: [CreateUserService],
})
export class CreateUserModule {}
