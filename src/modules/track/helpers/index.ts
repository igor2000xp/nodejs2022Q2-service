import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { CreateTrackDto } from '../dto/create-track.dto';
import * as uuid from 'uuid';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';

export const validateId404 = (id: string, tracks: any[]): boolean => {
  if (tracks.find((item) => item.id === id)) {
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

export const createNewTrack = (createTrackDto: CreateTrackDto) => {
  return new TrackEntity({ ...createTrackDto, id: uuid.v4() });
};

export const checkFields = (id: string, updateTrackDto: UpdateTrackDto) => {
  if (
    typeof updateTrackDto.name === 'string' &&
    typeof updateTrackDto.duration === 'number' &&
    (typeof updateTrackDto.albumId === 'string' ||
      updateTrackDto.albumId === null) &&
    (typeof updateTrackDto.artistId === 'string' ||
      updateTrackDto.artistId === null)
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
