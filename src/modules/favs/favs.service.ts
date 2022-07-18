import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InMemoryUserStore } from '../../store/in-memory-user-store';
import { checkAlbumId, checkArtistId, checkTrackId } from './helpers';

@Injectable()
export class FavsService {
  constructor(private store: InMemoryUserStore) {}

  createTrackFavorite(id: string) {
    const trackCheck = this.store.tracks.find((item) => item.id === id);
    if (!trackCheck) throw new UnprocessableEntityException();

    const track = this.store.tracks.find((item) => item.id === id);
    this.store.favorites.tracks.push(track.id);
  }

  createAlbumFavorite(id: string) {
    const albumCheck = this.store.albums.find((item) => item.id === id);
    if (!albumCheck) throw new UnprocessableEntityException();

    const album = this.store.albums.find((item) => item.id === id);
    this.store.favorites.albums.push(album.id);
  }

  createArtistFavorite(id: string) {
    const artistCheck = this.store.artists.find((item) => item.id === id);
    if (!artistCheck) throw new UnprocessableEntityException();

    const artist = this.store.artists.find((item) => item.id === id);
    this.store.favorites.artists.push(artist.id);
  }

  removeTrackFromFavorite(id: string) {
    checkTrackId(id, this.store.favorites.tracks);
    this.store.favorites.tracks = this.store.favorites.tracks.filter(
      (itemId) => itemId !== id,
    );
  }

  removeAlbumFromFavorite(id: string) {
    checkAlbumId(id, this.store.favorites.albums);
    this.store.favorites.albums = this.store.favorites.albums.filter(
      (itemId) => itemId !== id,
    );
  }

  removeArtistFromFavorite(id: string) {
    checkArtistId(id, this.store.favorites.artists);
    this.store.favorites.artists = this.store.favorites.artists.filter(
      (item) => item !== id,
    );
  }

  getAll() {
    const resultAllTracks = this.store.favorites.tracks.map((itemId) => {
      return this.store.tracks.find((tr) => tr.id === itemId);
    });

    const resultAllAlbums = this.store.favorites.albums.map((itemId) => {
      return this.store.albums.find((tr) => tr.id === itemId);
    });

    const resultAllArtists = this.store.favorites.artists.map((itemId) => {
      return this.store.artists.find((tr) => tr.id === itemId);
    });

    return {
      artists: resultAllArtists || [],
      albums: resultAllAlbums || [],
      tracks: resultAllTracks || [],
    };
  }
}
