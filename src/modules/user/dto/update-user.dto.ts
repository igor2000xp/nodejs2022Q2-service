import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'pAsSword' })
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'pAsSword' })
  newPassword: string;
}
