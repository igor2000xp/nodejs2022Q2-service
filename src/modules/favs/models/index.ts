import { IArtist } from '../../artist/models';
import { IAlbum } from '../../album/models';
import { ITrack } from '../../track/models';

export interface IFavorites {
  artists: IArtist[]; // favorite artists ids
  albums: IAlbum[]; // favorite albums ids
  tracks: ITrack[]; // favorite tracks ids
}
