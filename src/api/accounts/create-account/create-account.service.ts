import { Injectable } from '@nestjs/common';
import { CreateUserService } from '../../users/create-user/create-user.service';
import { CreateAccountDto } from './create-account.dto';

@Injectable()
export class CreateAccountService {
  constructor(private readonly createUserService: CreateUserService) {}

  async create(
    createAccountDto: CreateAccountDto,
  ): Promise<{ message: string }> {
    // Chama serviço para criação de usuário
    await this.createUserService.create(createAccountDto);

    return { message: 'Created' };
  }
}
