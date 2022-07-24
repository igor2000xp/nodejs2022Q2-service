import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { StatusCodes } from 'http-status-codes';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('track/:id')
  @HttpCode(StatusCodes.CREATED)
  async createTrackFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favsService.createTrackFavorite(id);
  }

  @Post('album/:id')
  @HttpCode(StatusCodes.CREATED)
  async createAlbumFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favsService.createAlbumFavorite(id);
  }

  @Post('artist/:id')
  @HttpCode(StatusCodes.CREATED)
  async createArtistFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favsService.createArtistFavorite(id);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  async getAll() {
    return await this.favsService.getAll();
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrackFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favsService.removeTrackFromFavorite(id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtistFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favsService.removeArtistFromFavorite(id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbumFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favsService.removeAlbumFromFavorite(id);
  }
}
