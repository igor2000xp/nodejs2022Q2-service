import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

export const checkTrackId = (id: string, tracks: string[]) => {
  if (tracks.filter((item) => item === id)) {
    return true;
  } else {
    throw new HttpException(
      {
        status: StatusCodes.NOT_FOUND,
        error: 'corresponding track is not favorite',
      },
      StatusCodes.NOT_FOUND,
    );
  }
};

export const checkAlbumId = (id: string, albums: string[]) => {
  if (albums.find((item) => item === id)) {
    return albums.find((item) => item === id);
  } else {
    throw new HttpException(
      {
        status: StatusCodes.NOT_FOUND,
        error: 'corresponding album is not favorite',
      },
      StatusCodes.NOT_FOUND,
    );
  }
};

export const checkArtistId = (id: string, artists: string[]) => {
  const isArtist = artists.findIndex((item) => item === id);
  if (isArtist !== -1) {
    return artists.find((item) => item === id);
  } else {
    throw new HttpException(
      {
        status: StatusCodes.NOT_FOUND,
        error: 'corresponding artist is not favorite',
      },
      StatusCodes.NOT_FOUND,
    );
  }
};
