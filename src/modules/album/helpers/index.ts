import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { IAlbum } from '../models';
import { CreateAlbumDto } from '../dto/create-album.dto';
import * as uuid from 'uuid';
import { UpdateAlbumDto } from '../dto/update-album.dto';

export const validateId404 = (id: string, albums: IAlbum[]): boolean => {
  if (albums.find((item) => item.id === id)) {
    // console.log(albums.find((item) => item.id === id));
    // console.log(id);
    return true;
  } else {
    // console.log(albums.find((item) => item.id === id));
    // console.log(id);
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
  return { ...createAlbumDto, id: uuid.v4() };
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
        error: '',
      },
      StatusCodes.BAD_REQUEST,
    );
  }
};
