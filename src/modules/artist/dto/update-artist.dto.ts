import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Freddie' })
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true })
  grammy: boolean;
}
