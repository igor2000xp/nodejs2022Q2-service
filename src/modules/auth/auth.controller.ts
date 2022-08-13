import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { Public } from './decorators/public.decorator';

@Public()
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
  @HttpCode(HttpStatus.OK)
  async login(@Body() updateAuthDto: UpdateAuthDto) {
    return await this.authService.login(updateAuthDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshAuthDto: RefreshAuthDto) {
    return await this.authService.refresh(refreshAuthDto);
  }
}
