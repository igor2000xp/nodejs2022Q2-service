import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Header,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async signup(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.signup(createAuthDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  // async login(@Request() req) {
  async login(@Body() updateAuthDto: UpdateAuthDto) {
    // return await this.authService.login(req.user);
    return await this.authService.login(updateAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async refresh(@Body() updateAuthDto: UpdateAuthDto) {
    return await this.authService.refresh(updateAuthDto);
  }
}
