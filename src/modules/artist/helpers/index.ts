import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { IArtist } from '../models';
import * as uuid from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';

export const validateId404 = (id: string, artist: IArtist[]): boolean => {
  if (artist.find((item) => item.id === id)) {
    console.log(artist.find((item) => item.id === id));
    console.log(id);
    return true;
  } else {
    console.log(artist.find((item) => item.id === id));
    console.log(id);
    throw new HttpException(
      {
        state: StatusCodes.NOT_FOUND,
        error: "record with id === userId doesn't exist",
      },
      StatusCodes.NOT_FOUND,
    );
  }
};

export const createArtist = (createArtistDto: CreateArtistDto) => {
  return { ...createArtistDto, id: uuid.v4() };
};

export const isFieldsExist = (createArtistDto: CreateArtistDto) => {
  if (createArtistDto.name && createArtistDto.grammy) {
    return true;
  } else {
    throw new HttpException(
      {
        state: StatusCodes.BAD_REQUEST,
        error: 'request body does not contain required fields',
      },
      StatusCodes.BAD_REQUEST,
    );
  }
};

export const isValidField = (createArtistDto: CreateArtistDto) => {
  if (
    typeof createArtistDto.name === 'string' &&
    typeof createArtistDto.grammy === 'boolean'
  ) {
    return true;
  } else {
    throw new HttpException(
      {
        status: StatusCodes.BAD_REQUEST,
        error: "record with id === trackId doesn't exist",
      },
      StatusCodes.BAD_REQUEST,
    );
  }
};
