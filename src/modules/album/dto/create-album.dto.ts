import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @IsUUID()
  @IsOptional()
  id: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Album' })
  name?: string;

  @IsNumber()
  @ApiProperty({ example: 1964 })
  year?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '26a1b6da-2a97-4582-9b97-dcc8e6c7ffee' })
  artistId?: string;
}
