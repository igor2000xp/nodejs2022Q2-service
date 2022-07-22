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
  createTrackFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.createTrackFavorite(id);
  }

  @Post('album/:id')
  @HttpCode(StatusCodes.CREATED)
  createAlbumFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.createAlbumFavorite(id);
  }

  @Post('artist/:id')
  @HttpCode(StatusCodes.CREATED)
  createArtistFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.createArtistFavorite(id);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  getAll() {
    return this.favsService.getAll();
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeTrackFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.removeTrackFromFavorite(id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeArtistFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.removeArtistFromFavorite(id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeAlbumFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.removeAlbumFromFavorite(id);
  }
}
