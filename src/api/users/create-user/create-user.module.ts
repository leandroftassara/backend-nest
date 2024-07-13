import { Module } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { UsersRepository } from '../users.repository';
import { Utils } from '../../../shared/utils';
import { MailerService } from '../../../shared/mailer.service';
import { PrismaService } from '../../../shared/prisma.service';

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
