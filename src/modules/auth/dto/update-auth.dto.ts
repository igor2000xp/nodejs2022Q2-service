import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Login' })
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'qwerty' })
  password: string;
}
