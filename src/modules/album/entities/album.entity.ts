import { ApiProperty } from '@nestjs/swagger';

export class AlbumEntity {
  @ApiProperty({ example: '26a1b6da-2a97-4582-9b97-dcc8e6c7ffee' })
  id: string;

  @ApiProperty({ example: 'innuendo' })
  name: string;

  @ApiProperty({ example: 1964 })
  year: number;

  @ApiProperty({ example: '26a1b6da-2a97-4582-9b97-dcc8e6c7ffee' })
  artistId: string | null;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
