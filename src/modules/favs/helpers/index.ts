import { TrackEntity } from '../../track/entities/track.entity';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { AlbumEntity } from '../../album/entities/album.entity';

export const removeFavsFieldFromTrack = (tracks: TrackEntity[]) => {
  return tracks.map((item) => {
    return {
      albumId: item.albumId,
      artistId: item.artistId,
      duration: item.duration,
      id: item.id,
      name: item.name,
    };
  });
};

export const removeFavsFieldFromArtist = (artists: ArtistEntity[]) => {
  return artists.map((item) => {
    return {
      grammy: item.grammy,
      id: item.id,
      name: item.name,
    };
  });
};

export const removeFavsFieldFromAlbum = (albums: AlbumEntity[]) => {
  return albums.map((item) => {
    return {
      artistId: item.artistId,
      id: item.id,
      name: item.name,
      year: item.year,
    };
  });
};
