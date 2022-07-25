import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InMemoryUserStore } from '../../store/in-memory-user-store';
import { PrismaService } from '../../prisma/prisma.service';
import {
  removeFavsFieldFromAlbum,
  removeFavsFieldFromArtist,
  removeFavsFieldFromTrack,
} from './helpers';

@Injectable()
export class FavsService {
  constructor(
    private store: InMemoryUserStore,
    private prisma: PrismaService,
  ) {}

  async createTrackFavorite(id: string) {
    try {
      await this.prisma.track.update({
        where: { id },
        data: { favsTrack: true },
      });
    } catch (err) {
      throw new UnprocessableEntityException({}, `${err}`);
    }
  }

  async createAlbumFavorite(id: string) {
    try {
      await this.prisma.album.update({
        where: { id },
        data: { favsAlbum: true },
      });
    } catch (err) {
      throw new UnprocessableEntityException({}, `${err}`);
    }
  }

  async createArtistFavorite(id: string) {
    try {
      await this.prisma.artist.update({
        where: { id },
        data: { favsArtist: true },
      });
    } catch (err) {
      throw new UnprocessableEntityException({}, `${err}`);
    }
  }

  async removeTrackFromFavorite(id: string) {
    try {
      await this.prisma.track.update({
        where: { id },
        data: { favsTrack: false },
      });
    } catch (err) {
      throw new NotFoundException({}, `${err}`);
    }
  }

  async removeAlbumFromFavorite(id: string) {
    try {
      await this.prisma.album.update({
        where: { id },
        data: { favsAlbum: false },
      });
    } catch (err) {
      throw new NotFoundException({}, `${err}`);
    }
  }

  async removeArtistFromFavorite(id: string) {
    try {
      await this.prisma.artist.update({
        where: { id },
        data: { favsArtist: false },
      });
    } catch (err) {
      throw new NotFoundException({}, `${err}`);
    }
  }

  async getAll() {
    let resultAllTracksCorr = [];
    let resultAllAlbumsCorr = [];
    let resultAllArtistsCorr = [];

    try {
      const resultAllTracks = await this.prisma.track.findMany({
        where: { favsTrack: true },
      });
      resultAllTracksCorr = removeFavsFieldFromTrack(resultAllTracks);

      const resultAllAlbums = await this.prisma.album.findMany({
        where: { favsAlbum: true },
      });
      resultAllAlbumsCorr = removeFavsFieldFromAlbum(resultAllAlbums);

      const resultAllArtists = await this.prisma.artist.findMany({
        where: { favsArtist: true },
      });
      resultAllArtistsCorr = removeFavsFieldFromArtist(resultAllArtists);
    } catch (err) {
      throw new BadRequestException({}, `${err}`);
    }
    return {
      artists: resultAllArtistsCorr || [],
      albums: resultAllAlbumsCorr || [],
      tracks: resultAllTracksCorr || [],
    };
  }
}
