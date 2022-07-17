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
    // return 'This action adds a new track';
  }

  findAll() {
    return this.store.tracks;
    // return `This action returns all track`;
  }

  findOne(id: string) {
    validateId404(id, this.store.tracks);
    return this.store.tracks.find((item) => item.id === id);
    // return `This action returns a #${id} track`;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    // console.log(id, updateTrackDto);
    validateId404(id, this.store.tracks);
    checkFields(id, updateTrackDto);
    const trackObj = this.store.tracks.find((item) => item.id === id);
    const index = this.store.tracks.indexOf(trackObj);
    this.store.tracks[index] = { ...updateTrackDto, id };
    return this.store.tracks[index];
    // return `This action updates a #${id} track`;
  }

  remove(id: string) {
    validateId404(id, this.store.tracks);
    this.store.tracks = this.store.tracks.filter((item) => item.id !== id);
    return `This action removes a #${id} track`;
  }
}
