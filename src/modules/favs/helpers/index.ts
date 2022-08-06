import * as uuid from 'uuid';
import { ITrack } from '../../track/models';
import { IAlbum } from '../../album/models';
import { IArtist } from '../../artist/models';

interface IDataFavs {
  trackID?: string | null;
  artistID?: string | null;
  albumID?: string | null;
}

export const createCurrentUserId = async (users, id: string, mark: string) => {
  const data: IDataFavs = {};
  switch (mark) {
    case 'track':
      data.trackID = id;
      break;
    case 'artist':
      data.artistID = id;
      break;
    case 'album':
      data.albumID = id;
      break;
  }
  return {
    currentUserId: users.length ? users[users.length - 1].id : uuid.v4(),
    trackID: data.trackID || '',
    albumID: data.albumID || '',
    artistID: data.artistID || '',
    id,
  };
};

export const createObjForReturnTrack = (track: ITrack): ITrack => {
  return {
    albumId: track.albumId ? track.albumId : null,
    artistId: track.artistId ? track.artistId : null,
    duration: track.duration,
    id: track.id,
    name: track.name,
  };
};

export const createObjForReturnAlbum = (album: IAlbum): IAlbum => {
  return {
    artistId: album.artistId ? album.artistId : null,
    year: album.year,
    id: album.id,
    name: album.name,
  };
};

export const createObjForReturnArtist = (artist: IArtist): IArtist => {
  return {
    grammy: artist.grammy,
    id: artist.id,
    name: artist.name,
  };
};
