import crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { Utils } from 'src/shared/utils';
import { Mailer } from 'src/shared/mailer';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly utils: Utils,
    private readonly mailer: Mailer,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ user: any }> {
    // Gera um código de verificação para email
    const verificationCode = Array.from({ length: 6 }, () =>
      crypto.randomInt(0, 10),
    ).join('');

    // Criptografa senha
    createUserDto.password = await this.utils.encryptPassword(
      createUserDto.password,
    );

    // Envia email
    await this.mailer.sendEmail({
      sender: 'account@leandr1n.com',
      to: 'account@leandr1n.com',
      subject: 'Confirmação de cadastro',
      name: this.utils.getFirstName(createUserDto.name),
      // template: 'account-verification.html',
      // variables: {
      //   name: getFirstName(createUserData.name)
      // },
    });

    return { user: { ...createUserDto, verificationCode } };
  }
}
