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
// import { CreateFavDto } from './dto/create-fav.dto';
// import { UpdateFavDto } from './dto/update-fav.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('track/:id')
  @HttpCode(StatusCodes.CREATED)
  createTrackFavorite(
    @Param('id', ParseUUIDPipe) id: string,
    // @Body() createFavDto: CreateFavDto,
  ) {
    return this.favsService.createTrackFavorite(id);
    // return { message: 'Successfully added' };
  }

  @Post('album/:id')
  @HttpCode(StatusCodes.CREATED)
  createAlbumFavorite(
    @Param('id', ParseUUIDPipe) id: string,
    // @Body() createFavDto: CreateFavDto,
  ) {
    return this.favsService.createAlbumFavorite(id);
  }

  @Post('artist/:id')
  @HttpCode(StatusCodes.CREATED)
  createArtistFavorite(
    @Param('id', ParseUUIDPipe) id: string,
    // @Body() createFavDto: CreateFavDto,
  ) {
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
    // console.log(id);
    return this.favsService.removeArtistFromFavorite(id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeAlbumFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.removeAlbumFromFavorite(id);
  }

  // @Get(':id')
  // @HttpCode(StatusCodes.OK)
  // getById(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.favsService.getById(id);
  // }
  //
  // @Patch(':id')
  // @HttpCode(StatusCodes.OK)
  // update(@Param('id', ParseUUIDPipe) id: string, @Body() updateFavDto: UpdateFavDto) {
  //   return this.favsService.update(id, updateFavDto);
  // }
  //
  // @Delete(':id')
  // @HttpCode(StatusCodes.NO_CONTENT)
  // remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.favsService.remove(id);
  // }
}
