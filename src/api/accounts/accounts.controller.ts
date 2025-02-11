import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { Utils } from '../../shared/helpers/utils';
import {
  CreateAccountResponse,
  CreateAccountService,
} from './create-account/create-account.service';
import { CreateAccountDto } from './create-account/create-account.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BadRequestExceptionResponse,
  ConflictExceptionResponse,
} from '../../shared/helpers/swagger-exceptions';

@Controller('accounts')
@ApiTags('Accounts')
export class AccountsController {
  constructor(
    private readonly utils: Utils,
    private readonly createAccountService: CreateAccountService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Solicita a criação de uma nova conta',
    description:
      'Apenas solicita o registro de uma nova conta. A efetivação da conta se da após à confirmação do email.',
  })
  @ApiResponse({
    status: 201,
    description: 'Conta registrada com sucesso',
    type: CreateAccountResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição inválida',
    type: BadRequestExceptionResponse,
  })
  @ApiResponse({
    status: 409,
    description: 'Conta já registrada',
    type: ConflictExceptionResponse,
  })
  @ApiBody({ type: CreateAccountDto })
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
