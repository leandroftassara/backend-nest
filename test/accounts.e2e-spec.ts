import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/shared/infra/prisma.service';

describe('Accounts (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    // Configurar ValidationPipe globalmente
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    prisma = moduleRef.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await prisma.$queryRaw`
      delete from users
      where email = 'testuser@example.com'
    `;

    await app.close();
  });

  describe('Create account', () => {
    it('POST /accounts - Success', async () => {
      return await request(app.getHttpServer())
        .post('/accounts')
        .send({
          name: 'Test User',
          email: 'testuser@example.com',
          password: 'password123',
          passwordConfirmation: 'password123',
        })
        .expect(201)
        .expect({ message: 'Created' });
    });

    it('POST /accounts - Different passwords', async () => {
      return await request(app.getHttpServer())
        .post('/accounts')
        .send({
          name: 'Test User',
          email: 'testuser@example.com',
          password: 'password12',
          passwordConfirmation: 'password123',
        })
        .expect(400);
    });

    it('POST /accounts - Invalid', async () => {
      return await request(app.getHttpServer())
        .post('/accounts')
        .send({
          name2: 'Test User',
          email2: 'testuser@example.com',
          password2: 'password123',
          passwordConfirmation2: 'password123',
        })
        .expect(400);
    });

    it('POST /accounts - Conflict', async () => {
      return await request(app.getHttpServer())
        .post('/accounts')
        .send({
          name: 'Test User',
          email: 'testuser@example.com',
          password: 'password123',
          passwordConfirmation: 'password123',
        })
        .expect(409);
    });
  });
});
