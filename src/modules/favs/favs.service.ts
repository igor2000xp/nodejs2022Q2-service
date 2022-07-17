import { Injectable } from '@nestjs/common';
import { InMemoryUserStore } from '../../store/in-memory-user-store';
import {
  checkAlbumId,
  checkArtistId,
  checkTrackId,
  checkUnprocessableArtist,
} from './helpers';

@Injectable()
export class FavsService {
  constructor(private store: InMemoryUserStore) {}

  createTrackFavorite(id: string) {
    // co
    // const trackArr = this.store.tracks.filter((item) => item.id === id);
    const track = this.store.tracks.find((item) => item.id === id);
    this.store.favorites.tracks.push(track);
    return `This action adds a new fav-track ${id}`;
  }

  createAlbumFavorite(id: string) {
    const album = this.store.albums.find((item) => item.id === id);
    this.store.favorites.albums.push(album);
    return `This action adds a new fav-album ${id}`;
  }

  createArtistFavorite(id: string) {
    const artist = this.store.artists.find((item) => item.id === id);
    this.store.favorites.artists.push(artist);

    // return { message: `${artist}` };
    return `This action adds a new fav-artist ${id}`;
  }

  removeTrackFromFavorite(id: string) {
    checkTrackId(id, this.store.favorites.tracks);
    this.store.favorites.tracks = this.store.favorites.tracks.filter(
      (item) => item.id !== id,
    );
    // console.log(id);
  }

  removeAlbumFromFavorite(id: string) {
    checkAlbumId(id, this.store.favorites.albums);
    this.store.favorites.albums = this.store.favorites.albums.filter(
      (item) => item.id !== id,
    );
    // console.log(id);
  }

  removeArtistFromFavorite(id: string) {
    console.log(this.store.favorites.artists);
    checkUnprocessableArtist(id, this.store.favorites.artists);
    checkArtistId(id, this.store.favorites.artists);
    this.store.favorites.artists = this.store.favorites.artists.filter(
      (item) => item.id !== id,
    );
    // console.log(id);
  }

  getAll() {
    return this.store.favorites;
    // return `This action returns all favs`;
  }
  //
  // getById(id: string) {
  //   return this.store.favorites;
  //   // return `This action returns a #${id} fav`;
  // }
  //
  // update(id: string, updateFavDto: UpdateFavDto) {
  //   return `This action updates a #${id} fav`;
  // }
  //
  // remove(id: string) {
  //   return `This action removes a #${id} fav`;
  // }
}
