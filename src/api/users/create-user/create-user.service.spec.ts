import { Test } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { ConfigService } from '@nestjs/config';
import { Utils } from '../../../shared/helpers/utils';
import { MailerService } from '../../../shared/infra/mailer.service';
import { UsersRepository } from '../users.repository';
import { CreateUserDto } from './create-user.dto';
import { User } from '@prisma/client';
import { ConflictException } from '@nestjs/common';

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  let utils: Utils;
  let mailerService: MailerService;
  let usersRepository: UsersRepository;

  const makeCreateUserDto = (): CreateUserDto => ({
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserService,
        ConfigService,
        Utils,
        {
          provide: MailerService,
          useValue: { sendEmail: jest.fn() },
        },
        {
          provide: UsersRepository,
          useValue: { createUser: jest.fn() },
        },
      ],
    }).compile();

    createUserService = moduleRef.get<CreateUserService>(CreateUserService);
    utils = moduleRef.get<Utils>(Utils);
    mailerService = moduleRef.get<MailerService>(MailerService);
    usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
  });

  it('Should call usersRepository.createUser with correct values', async () => {
    const createUserDto = makeCreateUserDto();
    const testVerificationToken = '123456';
    const testPassword = 'encryptedPassword';

    jest
      .spyOn(utils, 'generateAccountVerificationToken')
      .mockReturnValue(testVerificationToken);
    jest.spyOn(utils, 'encryptPassword').mockResolvedValue(testPassword);
    jest.spyOn(usersRepository, 'createUser').mockResolvedValue({} as User);

    await createUserService.create(createUserDto);

    expect(utils.generateAccountVerificationToken).toHaveBeenCalled();
    expect(utils.encryptPassword).toHaveBeenCalledWith(
      makeCreateUserDto().password,
    );
    expect(usersRepository.createUser).toHaveBeenCalledWith({
      ...createUserDto,
      password: testPassword,
      verificationToken: testVerificationToken,
    });
  });

  it('Should throw ConflictException if usersRepository.createUser returns null', async () => {
    const createUserDto = makeCreateUserDto();

    jest.spyOn(usersRepository, 'createUser').mockResolvedValue(null);

    await expect(createUserService.create(createUserDto)).rejects.toThrow(
      ConflictException,
    );
  });

  it('Should call mailerService.sendEmail with correct values', async () => {
    const createUserDto = makeCreateUserDto();
    const firstName = 'Test';
    const testVerificationToken = '123456';

    jest.spyOn(utils, 'getFirstName').mockReturnValue(firstName);
    jest
      .spyOn(utils, 'generateAccountVerificationToken')
      .mockReturnValue(testVerificationToken);
    jest.spyOn(usersRepository, 'createUser').mockResolvedValue({} as User);

    await createUserService.create(createUserDto);

    expect(mailerService.sendEmail).toHaveBeenCalledWith({
      sender: expect.any(String),
      to: 'account@leandr1n.com',
      subject: 'Confirmação de cadastro',
      template: 'account-created.html',
      variables: {
        name: utils.getFirstName(createUserDto.name),
        verificationLink: `https://dev.leandr1n.com/account/verificate?token=${utils.generateAccountVerificationToken()}`,
      },
    });
  });

  it('Should return an User if email doesnt conflict', async () => {
    const createUserDto = makeCreateUserDto();
    const user = {} as User;

    jest.spyOn(usersRepository, 'createUser').mockResolvedValue(user);

    const result = await createUserService.create(createUserDto);

    expect(result).toEqual(user);
  });
});
