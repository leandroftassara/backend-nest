import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './create-user/create-user.dto';
import { CreateUserService } from './create-user/create-user.service';
import { Utils } from 'src/shared/utils';

@Controller('users')
export class UsersController {
  constructor(
    private readonly utils: Utils,
    private readonly createUserService: CreateUserService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    //Padronização das variaveis
    createUserDto.email = this.utils.formatEmail(createUserDto.email);

    return await this.createUserService.create(createUserDto);
  }
}
