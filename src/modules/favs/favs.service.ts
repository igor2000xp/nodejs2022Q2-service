import {
  // HttpException,
  // HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InMemoryUserStore } from '../../store/in-memory-user-store';
import { checkAlbumId, checkArtistId, checkTrackId } from './helpers';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(
    private store: InMemoryUserStore,
    private prisma: PrismaService,
  ) {}

  async createTrackFavorite(id: string) {
    // // const trackCheck = this.store.tracks.find((item) => item.id === id);
    // const trackCheck = this.store.tracks.find((item) => item.id === id);
    // if (!trackCheck) throw new UnprocessableEntityException();
    //
    // const track = this.store.tracks.find((item) => item.id === id);
    // this.store.favorites.tracks.push(track.id);
    const track = await this.prisma.track.findFirst({ where: { id } });
    if (!track) throw new UnprocessableEntityException();
    await this.prisma.track.update({
      where: { id },
      data: {
        ...track,
        favsTrack: true,
      },
    });

    //   try {
    //   } catch (err) {
    //     throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
    //   }
  }

  async createAlbumFavorite(id: string) {
    // const albumCheck = this.store.albums.find((item) => item.id === id);
    // if (!albumCheck) throw new UnprocessableEntityException();
    //
    // const album = this.store.albums.find((item) => item.id === id);
    // this.store.favorites.albums.push(album.id);
    const album = await this.prisma.album.findMany({ where: { id } });
    if (!album) throw new UnprocessableEntityException();
    await this.prisma.album.update({
      where: { id },
      data: {
        ...album,
        favsAlbum: true,
      },
    });
  }

  async createArtistFavorite(id: string) {
    // const artistCheck = this.store.artists.find((item) => item.id === id);
    // if (!artistCheck) throw new UnprocessableEntityException();
    //
    // const artist = this.store.artists.find((item) => item.id === id);
    // this.store.favorites.artists.push(artist.id);
    const artist = await this.prisma.artist.findMany({ where: { id } });
    if (!artist) throw new UnprocessableEntityException();
    await this.prisma.artist.update({
      where: { id },
      data: {
        ...artist,
        favsArtist: true,
      },
    });
  }

  async removeTrackFromFavorite(id: string) {
    // checkTrackId(id, this.store.favorites.tracks);
    // this.store.favorites.tracks = this.store.favorites.tracks.filter(
    //   (itemId) => itemId !== id,
    // );
    checkTrackId(id, await this.prisma.track.findMany());
    await this.prisma.track.update({
      where: { id },
      data: { favsTrack: false },
    });
  }

  async removeAlbumFromFavorite(id: string) {
    // checkAlbumId(id, this.store.favorites.albums);
    // this.store.favorites.albums = this.store.favorites.albums.filter(
    //   (itemId) => itemId !== id,
    // );
    checkAlbumId(id, await this.prisma.album.findMany());
    await this.prisma.album.update({
      where: { id },
      data: { favsAlbum: false },
    });
  }

  async removeArtistFromFavorite(id: string) {
    // checkArtistId(id, this.store.favorites.artists);
    // this.store.favorites.artists = this.store.favorites.artists.filter(
    //   (item) => item !== id,
    // );
    checkArtistId(id, await this.prisma.artist.findMany());
    await this.prisma.artist.update({
      where: { id },
      data: { favsArtist: false },
    });
  }

  async getAll() {
    // console.log(
    //   await this.prisma.track.findMany({
    //     where: { name: { equals: 'TEST_TRACK' } },
    //   }),
    // );
    // console.log(
    //   await this.prisma.track.findMany({
    //     where: { favsTrack: false },
    //   }),
    // );

    // const resultAllTracks = this.store.favorites.tracks.map((itemId) => {
    //   return this.store.tracks.find((tr) => tr.id === itemId);
    // });
    const resultAllTracks = await this.prisma.track.findMany({
      where: { favsTrack: true },
    });
    console.log(resultAllTracks);

    // const result = await prisma.user.findMany({
    //   where: {
    //     name: {
    //       equals: 'Eleanor',
    //     },
    //   },
    // })

    // const resultAllAlbums = this.store.favorites.albums.map((itemId) => {
    //   return this.store.albums.find((tr) => tr.id === itemId);
    // });
    const resultAllAlbums = await this.prisma.album.findMany({
      where: { favsAlbum: true },
    });

    // const resultAllArtists = this.store.favorites.artists.map((itemId) => {
    //   return this.store.artists.find((tr) => tr.id === itemId);
    // });

    const resultAllArtists = await this.prisma.artist.findMany({
      where: { favsArtist: true },
    });

    return {
      artists: resultAllArtists || [],
      albums: resultAllAlbums || [],
      tracks: resultAllTracks || [],
    };
  }
}
