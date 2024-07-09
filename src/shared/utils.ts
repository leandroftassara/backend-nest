import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Utils {
  formatEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  async encryptPassword(password: string): Promise<string> {
    const generatedSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, generatedSalt);

    return hashedPassword;
  }

  getFirstName = (name: string): string => {
    const firstName = name.split(' ')[0];

    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  };
}
