import { ApiProperty } from '@nestjs/swagger';

export class CreateFavDto {
  @ApiProperty({ example: ['26a1b6da-2a97-4582-9b97-dcc8e6c7ffee'] })
  id: string;

  @ApiProperty({ example: ['26a1b6da-2a97-4582-9b97-dcc8e6c7ffee'] })
  currentUserId: string;

  @ApiProperty({ example: ['26a1b6da-2a97-4582-9b97-dcc8e6c7ffee'] })
  artistId: string[];

  @ApiProperty({ example: ['26a1b6da-2a97-4582-9b97-dcc8e6c7ffee'] })
  albumID: string[];

  @ApiProperty({ example: ['26a1b6da-2a97-4582-9b97-dcc8e6c7ffee'] })
  trackID: string[];
}
