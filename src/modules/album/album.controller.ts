import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  async getAll() {
    return await this.albumService.getAll();
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.getById(id);
  }

  @Put(':id')
  @HttpCode(StatusCodes.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.remove(id);
  }
}
