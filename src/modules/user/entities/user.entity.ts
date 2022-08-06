import { Exclude, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({ example: '26a1b6da-2a97-4582-9b97-dcc8e6c7ffee' })
  id: string;

  @ApiProperty({ example: 'Igor' })
  login: string;

  @Exclude()
  @ApiProperty({ example: 'pasSword' })
  password: string;

  @ApiProperty({ example: 77 })
  version: number;

  @Transform(({ value }) => new Date(value).getTime())
  @ApiProperty({ example: 1777000000 })
  createdAt: Date;

  @Transform(({ value }) => new Date(value).getTime())
  @ApiProperty({ example: 1777000000 })
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
