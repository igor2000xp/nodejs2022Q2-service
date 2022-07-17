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
// import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private store: InMemoryUserStore) {}

  create(createArtistDto: CreateArtistDto) {
    // validateId404(id)
    isFieldsExist(createArtistDto);
    const newArtist = createArtist(createArtistDto);
    // const newArtist = new ArtistEntity(artistObj);
    this.store.artists.push(newArtist);
    // return 'This action adds a new artist';
    return newArtist;
  }

  getAll() {
    // return `This action returns all artist`;
    return this.store.artists;
  }

  getById(id: string) {
    // return `This action returns a #${id} artist`;
    validateId404(id, this.store.artists);
    return this.store.artists.find((usr) => usr.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    // console.log(id);
    validateId404(id, this.store.artists);
    isValidField(updateArtistDto);
    const index = this.store.artists.findIndex((item) => item.id === id);
    let newUser = this.store.artists.find((item) => item.id === id);
    newUser = { ...newUser, ...updateArtistDto, id };
    this.store.artists[index] = newUser;

    return newUser;

    // return `This action updates a #${id} artist`;
  }

  remove(id: string) {
    validateId404(id, this.store.artists);
    // const base = this.store.artists.map((usr) => {
    //   if (usr.id !== id) return usr;
    // });
    // this.store.artists = [...base];
    this.store.artists = this.store.artists.filter((usr) => usr.id !== id);
    return `This action removes a #${id} artist`;
  }
}
