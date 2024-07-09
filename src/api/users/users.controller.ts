import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './create-user/create-user.dto';
import { Utils } from 'src/shared/utils';
import { CreateUserService } from './create-user/create-user.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly utils: Utils,
    private readonly createUserService: CreateUserService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { password, passwordConfirmation } = createUserDto;

    if (password !== passwordConfirmation) {
      throw new BadRequestException('Passwords do not match');
    }

    //Padronização das variaveis
    createUserDto.email = this.utils.formatEmail(createUserDto.email);

    return await this.createUserService.create(createUserDto);
  }
}
