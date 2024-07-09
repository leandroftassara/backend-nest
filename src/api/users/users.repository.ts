import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User | null> {
    const { name, email, password, verificationCode } = data;

    const result = await this.prisma.$queryRaw<User[]>`
      insert into users
        (name, email, password, verification_code, updated_at)
      values
        (${name}, ${email}, ${password}, ${verificationCode}, now())
      on conflict (email)
        do nothing
      returning *;
    `;

    return result.length ? result[0] : null;
  }
}
