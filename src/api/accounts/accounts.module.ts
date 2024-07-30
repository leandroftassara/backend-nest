import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { CreateAccountModule } from './create-account/create-account.module';
import { Utils } from '../../shared/helpers/utils';

@Module({
  imports: [CreateAccountModule],
  controllers: [AccountsController],
  providers: [Utils],
})
export class AccountsModule {}
