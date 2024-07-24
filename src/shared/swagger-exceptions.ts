import { ApiProperty } from '@nestjs/swagger';

export class BadRequestExceptionResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;
}

export class ConflictExceptionResponse {
    @ApiProperty()
    statusCode: number;
  
    @ApiProperty()
    message: string;
  
    @ApiProperty()
    error: string;
  }