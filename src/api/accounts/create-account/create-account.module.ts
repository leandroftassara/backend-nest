import { Module } from '@nestjs/common';
import { CreateUserModule } from '../../users/create-user/create-user.module';
import { CreateAccountService } from './create-account.service';

@Module({
  imports: [CreateUserModule],
  providers: [CreateAccountService],
  exports: [CreateAccountService],
})
export class CreateAccountModule {}
