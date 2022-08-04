import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Login' })
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'qwerty' })
  password: string;
}
