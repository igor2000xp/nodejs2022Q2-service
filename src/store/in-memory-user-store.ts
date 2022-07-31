import { IUser } from '../modules/user/models';
import { Injectable } from '@nestjs/common';
import { IArtist } from '../modules/artist/models';
import { IAlbum } from '../modules/album/models';
import { ITrack } from '../modules/track/models';
import { IFavorites } from '../modules/favs/models';
import { string } from 'yaml/dist/schema/common/string';

@Injectable()
export class InMemoryUserStore {
  users: IUser[] = [];

  artists: IArtist[] = [];

  albums: IAlbum[] = [];

  tracks: ITrack[] = [];

  favorites: { artist: string[]; album: string[]; track: string[] } = {
    album: [],
    artist: [],
    track: [],
  };
}
