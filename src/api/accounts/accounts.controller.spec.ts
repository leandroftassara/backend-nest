import { Test } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { CreateAccountService } from './create-account/create-account.service';
import { CreateAccountDto } from './create-account/create-account.dto';
import { Utils } from '../../shared/utils';
import { BadRequestException } from '@nestjs/common';

describe('AccountsController', () => {
  let accountsController: AccountsController;
  let utils: Utils;
  let createAccountService: CreateAccountService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        Utils,
        {
          provide: CreateAccountService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    accountsController = moduleRef.get<AccountsController>(AccountsController);
    utils = moduleRef.get<Utils>(Utils);
    createAccountService =
      moduleRef.get<CreateAccountService>(CreateAccountService);
  });

  describe('Create', () => {
    it('Should throw BadRequestException if passwords are different', async () => {
      const createAccountDto: CreateAccountDto = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password12',
        passwordConfirmation: 'password123',
      };

      await expect(accountsController.create(createAccountDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('Should format email before service call', async () => {
      const createAccountDto: CreateAccountDto = {
        name: 'Test User',
        email: 'TESTUSER@EXAMPLE.COM',
        password: 'password123',
        passwordConfirmation: 'password123',
      };

      const formatEmailSpy = jest.spyOn(utils, 'formatEmail');
      const createSpy = jest.spyOn(createAccountService, 'create');

      await accountsController.create(createAccountDto);

      expect(formatEmailSpy).toHaveBeenCalledWith('TESTUSER@EXAMPLE.COM');
      expect(createSpy).toHaveBeenCalledWith({
        name: 'Test User',
        email: utils.formatEmail('TESTUSER@EXAMPLE.COM'),
        password: 'password123',
        passwordConfirmation: 'password123',
      });
    });

    it('Should call CreateAccountService.create with createAccountDto', async () => {
      const createAccountDto: CreateAccountDto = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        passwordConfirmation: 'password123',
      };

      const createSpy = jest.spyOn(createAccountService, 'create');

      await accountsController.create(createAccountDto);

      expect(createSpy).toHaveBeenCalledWith(createAccountDto);
    });

    it('Should return CreateAccountService.create response)', async () => {
      const createAccountDto: CreateAccountDto = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        passwordConfirmation: 'password123',
      };

      const result = { message: 'Created' };

      jest.spyOn(createAccountService, 'create').mockResolvedValue(result);

      await expect(
        accountsController.create(createAccountDto),
      ).resolves.toEqual(result);
    });
  });
});
