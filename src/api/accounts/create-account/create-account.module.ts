import { Module } from '@nestjs/common';
import { CreateAccountService } from './create-account.service';
import { CreateUserModule } from 'src/api/users/create-user/create-user.module';

@Module({
  imports: [CreateUserModule],
  providers: [CreateAccountService],
  exports: [CreateAccountService],
})
export class CreateAccountModule {}
