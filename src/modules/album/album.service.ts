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
    // return 'This action adds a new album';
  }

  getAll() {
    return this.store.albums;
    // return `This action returns all album`;
  }

  getById(id: string) {
    validateId404(id, this.store.albums);
    return this.store.albums.find((item) => item.id === id);
    // return `This action returns a #${id} album`;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    validateId404(id, this.store.albums);
    checkFields(updateAlbumDto);
    const albumObj = this.store.albums.find((item) => item.id === id);
    const index = this.store.albums.indexOf(albumObj);
    const newAlbum = { ...albumObj, ...updateAlbumDto };
    this.store.albums[index] = newAlbum;
    return newAlbum;
    // return `This action updates a #${id} album`;
  }

  remove(id: string) {
    validateId404(id, this.store.albums);
    this.store.albums = this.store.albums.filter((item) => item.id !== id);
    return `This action removes a #${id} album`;
  }
}
