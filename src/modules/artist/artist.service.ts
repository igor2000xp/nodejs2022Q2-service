import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryUserStore } from '../../store/in-memory-user-store';
import {
  createArtist,
  isFieldsExist,
  isValidField,
  validateId404,
} from './helpers';

@Injectable()
export class ArtistService {
  constructor(private store: InMemoryUserStore) {}

  create(createArtistDto: CreateArtistDto) {
    isFieldsExist(createArtistDto);
    const newArtist = createArtist(createArtistDto);
    this.store.artists.push(newArtist);
    return newArtist;
  }

  getAll() {
    return this.store.artists;
  }

  getById(id: string) {
    validateId404(id, this.store.artists);
    return this.store.artists.find((usr) => usr.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    validateId404(id, this.store.artists);
    isValidField(updateArtistDto);
    const index = this.store.artists.findIndex((item) => item.id === id);
    let newUser = this.store.artists.find((item) => item.id === id);
    newUser = { ...newUser, ...updateArtistDto, id };
    this.store.artists[index] = newUser;

    return newUser;
  }

  remove(id: string) {
    validateId404(id, this.store.artists);

    this.store.artists = this.store.artists.filter((usr) => usr.id !== id);

    this.store.tracks.forEach((track, index) => {
      if (track.artistId === id) this.store.tracks[index].artistId = null;
    });

    this.store.favorites.artists = this.store.favorites.artists.filter(
      (itemId) => itemId !== id,
    );

    return `This action removes a #${id} artist`;
  }
}
