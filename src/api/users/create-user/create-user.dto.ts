import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsEmail()
  @MaxLength(150)
  email: string;

  @MinLength(8)
  @MaxLength(32)
  password: string;

  @MinLength(8)
  @MaxLength(32)
  passwordConfirmation: string;
}
