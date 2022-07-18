// import { IArtist } from '../../artist/models';
// import { IAlbum } from '../../album/models';
// import { ITrack } from '../../track/models';

export interface IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
