import { Test } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../../shared/infra/prisma.service';
import { Prisma, User } from '@prisma/client';

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersRepository, PrismaService],
    }).compile();

    usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('CreateUser', () => {
    const makeUserCreateInput = (): Prisma.UserCreateInput => ({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'encryptedPassword',
      verificationToken: '123456',
    });

    it('Should return null if user not inserted', async () => {
      const userCreateInput = makeUserCreateInput();

      jest.spyOn(prismaService, '$queryRaw').mockResolvedValue([]);

      const result = await usersRepository.createUser(userCreateInput);

      expect(result).toBeNull();
    });

    it('Should return user if user inserted', async () => {
      const userCreateInput = makeUserCreateInput();

      const insertedUser = {} as User;

      jest.spyOn(prismaService, '$queryRaw').mockResolvedValue([insertedUser]);

      const result = await usersRepository.createUser(userCreateInput);

      expect(result).toEqual(insertedUser);
    });
  });
});
