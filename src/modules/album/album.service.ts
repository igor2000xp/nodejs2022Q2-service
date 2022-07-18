import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InMemoryUserStore } from '../../store/in-memory-user-store';
import { checkFields, createNewAlbum, validateId404 } from './helpers';

@Injectable()
export class AlbumService {
  constructor(private store: InMemoryUserStore) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = createNewAlbum(createAlbumDto);
    this.store.albums.push(newAlbum);
    return newAlbum;
  }

  getAll() {
    return this.store.albums;
  }

  getById(id: string) {
    validateId404(id, this.store.albums);
    return this.store.albums.find((item) => item.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    validateId404(id, this.store.albums);
    checkFields(updateAlbumDto);
    const albumObj = this.store.albums.find((item) => item.id === id);
    const index = this.store.albums.indexOf(albumObj);
    const newAlbum = { ...albumObj, ...updateAlbumDto };
    this.store.albums[index] = newAlbum;

    return newAlbum;
  }

  remove(id: string) {
    validateId404(id, this.store.albums);
    this.store.albums = this.store.albums.filter((item) => item.id !== id);

    this.store.tracks.forEach((track, index) => {
      if (track.albumId === id) this.store.tracks[index].albumId = null;
    });

    this.store.favorites.albums = this.store.favorites.albums.filter(
      (itemId) => itemId !== id,
    );
    return `This action removes a #${id} album`;
  }
}
