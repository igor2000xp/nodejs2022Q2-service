import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'admin' })
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'pAsSword' })
  password: string;
}
