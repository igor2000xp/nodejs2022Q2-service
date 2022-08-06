import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
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
    const isArtistFavs = await this.prisma.favorites.findFirst({
      where: { id },
    });
    if (isArtistFavs) await this.prisma.favorites.delete({ where: { id } });

    const isArtist = await this.prisma.artist.findFirst({ where: { id } });
    if (isArtist) return await this.prisma.artist.delete({ where: { id } });

    throw new NotFoundException();
  }
}
