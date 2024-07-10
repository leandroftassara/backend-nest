import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class Utils {
  formatEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  getFirstName = (name: string): string => {
    const firstName = name.split(' ')[0];

    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  };

  async encryptPassword(password: string): Promise<string> {
    const generatedSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, generatedSalt);

    return hashedPassword;
  }

  generateAccountVerificationToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }
}
