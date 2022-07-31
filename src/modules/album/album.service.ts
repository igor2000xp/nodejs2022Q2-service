import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InMemoryUserStore } from '../../store/in-memory-user-store';
import { checkFields, createNewAlbum, validateId404 } from './helpers';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(
    private store: InMemoryUserStore,
    private prisma: PrismaService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    try {
      const newAlbum = createNewAlbum(createAlbumDto);
      await this.prisma.album.create({ data: newAlbum });

      return newAlbum;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll() {
    return await this.prisma.album.findMany();
  }

  async getById(id: string) {
    validateId404(id, await this.prisma.album.findMany());
    return await this.prisma.album.findFirst({ where: { id } });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    validateId404(id, await this.prisma.album.findMany());
    checkFields(updateAlbumDto);
    const album = await this.prisma.album.findFirst({ where: { id } });

    return await this.prisma.album.update({
      where: { id },
      data: { ...album, ...updateAlbumDto },
    });
  }

  async remove(id: string) {
    const isAlbumInFavs = await this.prisma.favorites.findFirst({
      where: { id },
    });
    if (isAlbumInFavs) {
      await this.prisma.favorites.delete({ where: { id } });
    }

    const isAlbum = await this.prisma.album.findFirst({ where: { id } });
    if (isAlbum) {
      return this.prisma.album.delete({ where: { id } });
    }

    throw new NotFoundException();
  }
}
