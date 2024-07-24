import { Injectable } from '@nestjs/common';
import { CreateUserService } from '../../users/create-user/create-user.service';
import { CreateAccountDto } from './create-account.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountResponse {
  @ApiProperty()
  message: string;
}

@Injectable()
export class CreateAccountService {
  constructor(private readonly createUserService: CreateUserService) {}

  async create(
    createAccountDto: CreateAccountDto,
  ): Promise<CreateAccountResponse> {
    // Chama serviço para criação de usuário
    await this.createUserService.create(createAccountDto);

    return { message: 'Created' };
  }
}
