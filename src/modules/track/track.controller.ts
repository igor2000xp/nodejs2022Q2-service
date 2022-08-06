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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.trackService.findOne(id);
  }

  @Put(':id')
  @HttpCode(StatusCodes.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.trackService.remove(id);
  }
}
