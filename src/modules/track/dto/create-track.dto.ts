import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Innuendo' })
  name?: string;

  @IsNumber()
  @ApiProperty({ example: 77 })
  duration?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '26a1b6da-2a97-4582-9b97-dcc8e6c7ffee' })
  artistId?: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '26a1b6da-2a97-4582-9b97-dcc8e6c7ffee' })
  albumId?: string | null;
}
