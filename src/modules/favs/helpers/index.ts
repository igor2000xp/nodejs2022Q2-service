import { IArtist } from '../../artist/models';
import { ITrack } from '../../track/models';
import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { IAlbum } from '../../album/models';

export const checkTrackId = (id: string, tracks: ITrack[]) => {
  if (tracks.find((item) => item.id === id)) {
    return tracks.find((item) => item.id === id);
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

export const checkAlbumId = (id: string, albums: IAlbum[]) => {
  if (albums.find((item) => item.id === id)) {
    return albums.find((item) => item.id === id);
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

export const checkArtistId = (id: string, artists: IArtist[]) => {
  console.log(id);
  // if (artists.find((item) => item.id === id)) {
  const isArtist = artists.findIndex((item) => item.id === id);
  if (isArtist !== -1) {
    // if (artists.find((item) => item.id === id)) {
    return artists.find((item) => item.id === id);
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

export const checkUnprocessableArtist = (id: string, artists: IArtist[]) => {
  // if (typeof )
  const artistIndex = artists.findIndex((artist) => {
    if (typeof artist === 'undefined') {
      throw new HttpException(
        {
          status: StatusCodes.UNPROCESSABLE_ENTITY,
          error: 'undefined',
        },
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    return artist.id === id;
  });
  if (artistIndex === -1)
    throw new HttpException(
      {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        error: 'Artist is not found',
      },
      StatusCodes.UNPROCESSABLE_ENTITY,
    );
};

export const checkUnprocessableArtist2 = (id: string, artists: IArtist[]) => {
  // if (typeof )
  // const artistIndex = artists.findIndex((artist) => {
  //   return artist.id === id;
  // });
  const artist = artists.find((item) => item.id === id);
  if (!artist)
    throw new HttpException(
      {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        error: 'Artist is not found',
      },
      StatusCodes.UNPROCESSABLE_ENTITY,
    );
};
