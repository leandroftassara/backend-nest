import crypto from 'crypto';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { Utils } from 'src/shared/utils';
import { Mailer } from 'src/shared/mailer';
import { UsersRepository } from '../users.repository';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly utils: Utils,
    private readonly mailer: Mailer,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    // Gera um código de verificação para email
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Criptografa senha
    createUserDto.password = await this.utils.encryptPassword(
      createUserDto.password,
    );

    // Persiste usuário no DB
    const user = await this.usersRepository.createUser({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      verificationToken,
    });

    // Checa conflito de email
    if (!user)
      throw new ConflictException(
        'There is already an user for the provided email',
      );

    // Envia email
    await this.mailer.sendEmail({
      sender: 'account@leandr1n.com',
      to: 'account@leandr1n.com',
      subject: 'Confirmação de cadastro',
      name: this.utils.getFirstName(createUserDto.name),
    });

    return user;
  }
}
