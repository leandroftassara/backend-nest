import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({
    description: 'Nome do usuário',
    // example: 'John Doe',
    maxLength: 150,
  })
  name: string;

  @IsEmail()
  @MaxLength(150)
  @ApiProperty({
    description: 'Email do usuário',
    // example: 'john@example.com',
    format: 'email',
    maxLength: 150,
  })
  email: string;

  @MinLength(8)
  @MaxLength(32)
  @ApiProperty({
    description: 'Senha do usuário',
    // example: '<user-password>',
  })
  password: string;

  @MinLength(8)
  @MaxLength(32)
  @ApiProperty({
    description: 'Senha do usuário',
    // example: '<user-password>',
  })
  passwordConfirmation: string;
}
