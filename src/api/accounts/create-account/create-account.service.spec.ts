import { Test } from '@nestjs/testing';
import {
  CreateAccountResponse,
  CreateAccountService,
} from './create-account.service';
import { CreateUserService } from '../../users/create-user/create-user.service';
import { CreateAccountDto } from './create-account.dto';

describe('CreateAccountService', () => {
  let createAccountService: CreateAccountService;
  let createUserService: CreateUserService;

  const makeCreateAccountDto = (): CreateAccountDto => ({
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
    passwordConfirmation: 'password123',
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateAccountService,
        {
          provide: CreateUserService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createAccountService =
      moduleRef.get<CreateAccountService>(CreateAccountService);
    createUserService = moduleRef.get<CreateUserService>(CreateUserService);
  });

  it('Should call CreateUserService.create with CreateAccountDto', async () => {
    const createAccountDto = makeCreateAccountDto();

    await createAccountService.create(createAccountDto);

    expect(createUserService.create).toHaveBeenCalledWith(createAccountDto);
  });

  it('Should return a promise of CreateAccountResponse', async () => {
    const createAccountDto = makeCreateAccountDto();

    const result: CreateAccountResponse = { message: 'Created' };

    jest.spyOn(createUserService, 'create').mockResolvedValue(undefined);

    await expect(
      createAccountService.create(createAccountDto),
    ).resolves.toEqual(result);
  });
});
