import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getById(id);
  }

  @Put(':id')
  @HttpCode(StatusCodes.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
