import { Module } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { UsersRepository } from '../users.repository';
import { Utils } from '../../../shared/helpers/utils';
import { MailerService } from '../../../shared/infra/mailer.service';
import { PrismaService } from '../../../shared/infra/prisma.service';

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
