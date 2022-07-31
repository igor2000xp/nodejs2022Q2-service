import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  createCurrentUserId,
  createObjForReturnAlbum,
  createObjForReturnArtist,
  createObjForReturnTrack,
} from './helpers';
import { Prisma } from '.prisma/client';
import { ITrack } from '../track/models';
import { IAlbum } from '../album/models';
import { IArtist } from '../artist/models';

@Injectable()
export class FavsService {
  constructor(
    // private store: InMemoryUserStore,
    private prisma: PrismaService,
  ) {}

  async createTrackFavorite(id: string) {
    const isTrack = await this.prisma.track.findFirst({ where: { id } });
    if (!isTrack) throw new UnprocessableEntityException();
    try {
      const data: Prisma.FavoritesUncheckedCreateInput =
        await createCurrentUserId(
          await this.prisma.user.findMany(),
          id,
          'track',
        );

      const trackCheck = await this.prisma.favorites.findFirst({
        where: { id },
      });
      if (!trackCheck) await this.prisma.favorites.create({ data });

      return createObjForReturnTrack(
        await this.prisma.track.findFirst({ where: { id } }),
      );
    } catch (err) {
      throw new UnprocessableEntityException({}, `${err}`);
    }
  }

  async createAlbumFavorite(id: string) {
    const isAlbum = await this.prisma.album.findFirst({ where: { id } });
    if (!isAlbum) throw new UnprocessableEntityException();
    try {
      const data: Prisma.FavoritesUncheckedCreateInput =
        await createCurrentUserId(
          await this.prisma.user.findMany(),
          id,
          'album',
        );

      const albumCheck = await this.prisma.favorites.findFirst({
        where: { id },
      });
      if (!albumCheck) await this.prisma.favorites.create({ data });

      return createObjForReturnAlbum(
        await this.prisma.album.findFirst({ where: { id } }),
      );
    } catch (err) {
      throw new UnprocessableEntityException({}, `${err}`);
    }
  }

  async createArtistFavorite(id: string) {
    const isArtist = await this.prisma.artist.findFirst({ where: { id } });
    if (!isArtist) throw new UnprocessableEntityException();
    try {
      const data: Prisma.FavoritesUncheckedCreateInput =
        await createCurrentUserId(
          await this.prisma.user.findMany(),
          id,
          'artist',
        );

      const artistCheck = await this.prisma.favorites.findFirst({
        where: { id },
      });
      if (!artistCheck) await this.prisma.favorites.create({ data });

      return createObjForReturnArtist(
        await this.prisma.artist.findFirst({ where: { id } }),
      );
    } catch (err) {
      throw new UnprocessableEntityException({}, `${err}`);
    }
  }

  async removeTrackFromFavorite(id: string) {
    try {
      await this.prisma.track.findFirst({ where: { id } });
      await this.prisma.favorites.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException({}, `${err}`);
    }
  }

  async removeAlbumFromFavorite(id: string) {
    try {
      await this.prisma.album.findFirst({ where: { id } });
      await this.prisma.favorites.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException({}, `${err}`);
    }
  }

  async removeArtistFromFavorite(id: string) {
    try {
      await this.prisma.artist.findFirst({ where: { id } });
      await this.prisma.favorites.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException({}, `${err}`);
    }
  }

  async getAll() {
    let resultAllTracksCorr: ITrack[] = [];
    let resultAllAlbumsCorr: IAlbum[] = [];
    let resultAllArtistsCorr: IArtist[] = [];

    try {
      const resultAllTracks: ITrack[] = await this.prisma.favorites.findMany();

      const tracks = await this.prisma.track.findMany();
      resultAllTracksCorr = resultAllTracks.map((item) => {
        const track: ITrack = tracks.find((tr) => tr.id === item.id);
        const newTrack: ITrack =
          typeof track !== 'undefined' || null
            ? {
                artistId: track.artistId,
                albumId: track.albumId,
                name: track.name,
                duration: track.duration,
                id: item.id,
              }
            : {};

        return newTrack;
      });

      const resultAllAlbums: IAlbum[] = await this.prisma.favorites.findMany();
      const albums: IAlbum[] = await this.prisma.album.findMany();
      resultAllAlbumsCorr = resultAllAlbums.map((item) => {
        const album: IAlbum = albums.find((al) => al.id === item.id);
        const newAlbum: IAlbum =
          typeof album !== 'undefined' || null
            ? {
                artistId: album.artistId,
                // albumId: album.albumId,
                year: album.year,
                name: album.name,
                id: item.id,
              }
            : {};

        return newAlbum;
      });

      const resultAllArtists = await this.prisma.favorites.findMany();
      const artists: IArtist[] = await this.prisma.artist.findMany();
      resultAllArtistsCorr = resultAllArtists.map((item) => {
        const artist: IArtist = artists.find((ar) => ar.id === item.id);
        const newAlbum: IArtist =
          typeof artist !== 'undefined' || null
            ? {
                grammy: artist.grammy,
                name: artist.name,
                id: item.id,
              }
            : {};

        return newAlbum;
      });
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
