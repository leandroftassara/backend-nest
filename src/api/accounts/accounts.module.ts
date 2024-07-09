import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { Utils } from 'src/shared/utils';
import { CreateAccountModule } from './create-account/create-account.module';

@Module({
  imports: [CreateAccountModule],
  controllers: [AccountsController],
  providers: [Utils],
})
export class AccountsModule {}
