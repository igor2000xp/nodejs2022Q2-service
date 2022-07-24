import { ApiProperty } from '@nestjs/swagger';

export class FavEntity {
  @ApiProperty({ example: ['26a1b6da-2a97-4582-9b97-dcc8e6c7ffee'] })
  artists: string[];

  @ApiProperty({ example: ['26a1b6da-2a97-4582-9b97-dcc8e6c7ffee'] })
  albums: string[];

  @ApiProperty({ example: ['26a1b6da-2a97-4582-9b97-dcc8e6c7ffee'] })
  tracks: string[];

  constructor(partial: Partial<FavEntity>) {
    Object.assign(this, partial);
  }
}
