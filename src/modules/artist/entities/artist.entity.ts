import { ApiProperty } from '@nestjs/swagger';

export class ArtistEntity {
  @ApiProperty({ example: 'Freddie' })
  name: string;

  @ApiProperty({ example: true })
  grammy: boolean;

  @ApiProperty({ example: '26a1b6da-2a97-4582-9b97-dcc8e6c7ffee' })
  id: string;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
