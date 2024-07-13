import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { Utils } from '../../shared/utils';
import { CreateAccountService } from './create-account/create-account.service';
import { CreateAccountDto } from './create-account/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly utils: Utils,
    private readonly createAccountService: CreateAccountService,
  ) {}

  @Post('create')
  async create(@Body() createAccountDto: CreateAccountDto) {
    //Verificação das variaveis
    const { password, passwordConfirmation } = createAccountDto;

    if (password !== passwordConfirmation) {
      throw new BadRequestException('Passwords do not match');
    }

    //Padronização das variaveis
    createAccountDto.email = this.utils.formatEmail(createAccountDto.email);

    return await this.createAccountService.create(createAccountDto);
  }
}
