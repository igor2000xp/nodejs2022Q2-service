import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshAuthDto } from './dto/refresh-auth.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('Authentication');
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createAuthDto: CreateAuthDto) {
    this.logger.verbose(`create new user ${JSON.stringify(createAuthDto)}`);
    return await this.authService.signup(createAuthDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  // async login(@Request() req) {
  async login(@Body() updateAuthDto: UpdateAuthDto) {
    // return await this.authService.login(req.user);
    return await this.authService.login(updateAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshAuthDto: RefreshAuthDto) {
    return await this.authService.refresh(refreshAuthDto);
  }
}
