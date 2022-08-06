import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  async getAll() {
    return await this.artistService.getAll();
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistService.getById(id);
  }

  @Put(':id')
  @HttpCode(StatusCodes.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return await this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistService.remove(id);
  }
}
