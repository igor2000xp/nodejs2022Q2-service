import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { checkFields, createNewTrack, validateId404 } from './helpers';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    try {
      const newTrack = createNewTrack(createTrackDto);
      return await this.prisma.track.create({ data: newTrack });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    validateId404(id, await this.prisma.track.findMany());
    return await this.prisma.track.findFirst({ where: { id } });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    validateId404(id, await this.prisma.track.findMany());
    checkFields(id, updateTrackDto);

    const track = await this.prisma.track.findFirst({ where: { id } });
    return await this.prisma.track.update({
      where: { id },
      data: { ...track, ...updateTrackDto },
    });
  }

  async remove(id: string) {
    validateId404(id, await this.prisma.track.findMany());
    await this.prisma.track.delete({ where: { id } });

    const result = await this.prisma.favorites.findFirst({ where: { id } });
    if (result) await this.prisma.favorites.delete({ where: { id } });

    return `This action removes a #${id} track`;
  }
}
