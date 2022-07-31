import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import * as uuid from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export const validateId404 = (id: string, artist: any[]): boolean => {
  if (artist.find((item) => item.id === id)) {
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

export const createArtist = (createArtistDto: CreateArtistDto) => {
  return new ArtistEntity({
    ...createArtistDto,
    id: uuid.v4(),
  });
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
