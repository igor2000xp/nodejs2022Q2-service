import { ApiProperty } from '@nestjs/swagger';

export class TrackEntity {
  @ApiProperty({ example: '26a1b6da-2a97-4582-9b97-dcc8e6c7ffee' })
  id: string;

  @ApiProperty({ example: 'Innuendo' })
  name: string;

  @ApiProperty({ example: 77 })
  duration: number;

  @ApiProperty({ example: '26a1b6da-2a97-4582-9b97-dcc8e6c7ffee' })
  artistId: string | null;

  @ApiProperty({ example: '26a1b6da-2a97-4582-9b97-dcc8e6c7ffee' })
  albumId: string | null;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
