import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
// import { InMemoryUserStore } from '../../store/in-memory-user-store';
import {
  createArtist,
  isFieldsExist,
  isValidField,
  validateId404,
} from './helpers';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  // private store: InMemoryUserStore,

  async create(createArtistDto: CreateArtistDto) {
    try {
      isFieldsExist(createArtistDto);
      const newArtist = createArtist(createArtistDto);
      await this.prisma.artist.create({ data: newArtist });

      return newArtist;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll() {
    return await this.prisma.artist.findMany();
  }

  async getById(id: string) {
    validateId404(id, await this.prisma.artist.findMany());

    return this.prisma.artist.findFirst({ where: { id } });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    validateId404(id, await this.prisma.artist.findMany());
    isValidField(updateArtistDto);

    return await this.prisma.artist.update({
      where: { id },
      data: { ...updateArtistDto },
    });
  }

  async remove(id: string) {
    validateId404(id, await this.prisma.artist.findMany());
    await this.prisma.artist.delete({ where: { id } });

    // this.store.tracks.forEach((track, index) => {
    //   if (track.artistId === id) this.store.tracks[index].artistId = null;
    // });
    //
    // this.store.favorites.artists = this.store.favorites.artists.filter(
    //   (itemId) => itemId !== id,
    // );

    return `This action removes a #${id} artist`;
  }
}
