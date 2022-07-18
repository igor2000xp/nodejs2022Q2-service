import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InMemoryUserStore } from '../../store/in-memory-user-store';
import { checkFields, createNewTrack, validateId404 } from './helpers';

@Injectable()
export class TrackService {
  constructor(private store: InMemoryUserStore) {}

  create(createTrackDto: CreateTrackDto) {
    const newTrack = createNewTrack(createTrackDto);
    this.store.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.store.tracks;
  }

  findOne(id: string) {
    validateId404(id, this.store.tracks);
    return this.store.tracks.find((item) => item.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    validateId404(id, this.store.tracks);
    checkFields(id, updateTrackDto);
    const trackObj = this.store.tracks.find((item) => item.id === id);
    const index = this.store.tracks.indexOf(trackObj);
    this.store.tracks[index] = { ...updateTrackDto, id };
    return this.store.tracks[index];
  }

  remove(id: string) {
    validateId404(id, this.store.tracks);

    this.store.tracks = this.store.tracks.filter((usr) => usr.id !== id);

    this.store.favorites.tracks = this.store.favorites.tracks.filter(
      (itemId) => itemId !== id,
    );

    return `This action removes a #${id} track`;
  }
}
