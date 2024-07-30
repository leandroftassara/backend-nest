import { ApiProperty } from '@nestjs/swagger';

export class BadRequestExceptionResponse {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
  })
  message: string[] | string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}

export class ConflictExceptionResponse {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ example: 'Conflict' })
  error: string;
}
