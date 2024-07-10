import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { Utils } from 'src/shared/utils';
import { UsersRepository } from '../users.repository';
import { ConfigService } from '@nestjs/config';
import { MailerService } from 'src/shared/mailer.service';
import { User } from '@prisma/client';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly utils: Utils,
    private readonly mailerService: MailerService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Gera um código de verificação para email
    const verificationToken = this.utils.generateAccountVerificationToken();

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

    // Envia email de verificação
    await this.mailerService.sendEmail({
      sender: this.configService.get('AWS_SES_ACCOUNT_SENDER'),
      to: 'account@leandr1n.com',
      subject: 'Confirmação de cadastro',
      name: this.utils.getFirstName(createUserDto.name),
    });

    return user;
  }
}
