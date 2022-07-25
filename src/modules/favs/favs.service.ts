import {
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
    const track = await this.prisma.track.findFirst({ where: { id } });
    if (typeof track === 'undefined' || !track)
      throw new UnprocessableEntityException();
    await this.prisma.track.update({
      where: { id },
      data: {
        ...track,
        favsTrack: true,
      },
    });
  }

  async createAlbumFavorite(id: string) {
    const album = await this.prisma.album.findFirst({ where: { id } });
    if (typeof album === 'undefined' || !album)
      throw new UnprocessableEntityException();
    await this.prisma.album.update({
      where: { id },
      data: {
        ...album,
        favsAlbum: true,
      },
    });
  }

  async createArtistFavorite(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (typeof artist === 'undefined' || !artist)
      throw new UnprocessableEntityException();
    await this.prisma.artist.update({
      where: { id },
      data: {
        ...artist,
        favsArtist: true,
      },
    });
  }

  async removeTrackFromFavorite(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id } });
    if (!track) {
      throw new NotFoundException({}, 'Error');
    }
    await this.prisma.track.update({
      where: { id },
      data: { ...track, favsTrack: false },
    });
  }

  async removeAlbumFromFavorite(id: string) {
    const album = await this.prisma.album.findFirst({ where: { id } });
    if (!album) {
      throw new NotFoundException({}, 'Error');
    }
    await this.prisma.album.update({
      where: { id },
      data: { ...album, favsAlbum: false },
    });
  }

  async removeArtistFromFavorite(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (!artist) {
      throw new NotFoundException({}, 'Error');
    }
    await this.prisma.artist.update({
      where: { id },
      data: { ...artist, favsArtist: false },
    });
  }

  async getAll() {
    const resultAllTracks = await this.prisma.track.findMany({
      where: { favsTrack: true },
    });
    const resultAllTracksCorr = removeFavsFieldFromTrack(resultAllTracks);

    const resultAllAlbums = await this.prisma.album.findMany({
      where: { favsAlbum: true },
    });
    const resultAllAlbumsCorr = removeFavsFieldFromAlbum(resultAllAlbums);

    const resultAllArtists = await this.prisma.artist.findMany({
      where: { favsArtist: true },
    });
    const resultAllArtistsCorr = removeFavsFieldFromArtist(resultAllArtists);

    return {
      artists: resultAllArtistsCorr || [],
      albums: resultAllAlbumsCorr || [],
      tracks: resultAllTracksCorr || [],
    };
  }
}
