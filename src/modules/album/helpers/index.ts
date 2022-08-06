import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import * as uuid from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';

export const validateId404 = (id: string, albums: any[]): boolean => {
  if (albums.find((item) => item.id === id)) {
    return true;
  } else {
    throw new HttpException(
      {
        state: StatusCodes.NOT_FOUND,
        error: "record with id === userId doesn't exist",
      },
      StatusCodes.NOT_FOUND,
    );
  }
};

export const createNewAlbum = (createAlbumDto: CreateAlbumDto) => {
  return new AlbumEntity({ ...createAlbumDto, id: uuid.v4() });
};

export const checkFields = (updateAlbumDto: UpdateAlbumDto) => {
  if (
    typeof updateAlbumDto.name === 'string' &&
    typeof updateAlbumDto.year === 'number' &&
    typeof updateAlbumDto.artistId === 'string'
  ) {
    return true;
  } else {
    throw new HttpException(
      {
        state: StatusCodes.BAD_REQUEST,
        error: 'BAD_REQUEST',
      },
      StatusCodes.BAD_REQUEST,
    );
  }
};
