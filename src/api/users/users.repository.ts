import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User | null> {
    const { name, email, password, verificationToken } = data;

    const result = await this.prisma.$queryRaw<User[]>`
      insert into users
        (name, email, password, verification_token, updated_at)
      values
        (${name}, ${email}, ${password}, ${verificationToken}, now())
      on conflict (email)
        do nothing
      returning *;
    `;

    return result.length ? result[0] : null;
  }
}
