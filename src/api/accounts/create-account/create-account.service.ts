import { Injectable } from '@nestjs/common';
import { CreateUserService } from 'src/api/users/create-user/create-user.service';
import { CreateAccountDto } from './create-account.dto';

@Injectable()
export class CreateAccountService {
  constructor(private readonly createUserService: CreateUserService) {}

  async create(createAccountDto: CreateAccountDto): Promise<any> {
    // Chama serviço para criação de usuário
    const user = await this.createUserService.create(createAccountDto);

    return user;
  }
}
