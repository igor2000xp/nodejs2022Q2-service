import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IUserForPrint } from '../user/models';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ConfigService } from '@nestjs/config';
import { RefreshAuthDto } from './dto/refresh-auth.dto';

interface IPayLoad {
  id: string;
  login: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async validateUser(login: string, pass: string): Promise<IUserForPrint> {
    const user = await this.usersService.getByLogin(login);
    const isPasswordRight = bcrypt.compare(pass, user.password);
    if (isPasswordRight) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UpdateAuthDto) {
    const userByLog = await this.usersService.userByLogin({
      login: user.login,
    });
    if (!userByLog) throw new BadRequestException();

    try {
      const payload: IPayLoad = {
        id: userByLog.id,
        login: user.login,
      };
      let options = { expiresIn: process.env.TOKEN_EXPIRE_TIME };
      const accessToken = await this.jwtService.signAsync(payload, options);

      options = { expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME };
      const refreshToken = await this.jwtService.signAsync(payload, options);

      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  async signup(createAuthDto: CreateAuthDto) {
    return await this.usersService.create(createAuthDto);
  }

  async refresh(refreshAuthDto: RefreshAuthDto) {
    return this.getTokens(refreshAuthDto);
  }

  getTokens(refreshAuthDto: RefreshAuthDto) {
    const payload: IPayLoad = this.jwtService.decode(
      refreshAuthDto.refreshToken.split(' ')[1],
    ) as IPayLoad;
    const { id, login } = payload;

    const accessToken = this.getAccessToken(id, login);
    const refreshToken = this.getRefreshToken(id, login);

    return {
      ...accessToken,
      ...refreshToken,
    };
  }

  async getAccessToken(userId: string, login: string) {
    const payload = { userId, login };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET_KEY'),
      expiresIn: `${this.config.get('TOKEN_EXPIRE_TIME')}`,
    });
    return {
      accessToken: token,
    };
  }

  async getRefreshToken(id: string, login: string) {
    const payload = { id, login };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET_KEY'),
      expiresIn: `${this.config.get('TOKEN_REFRESH_EXPIRE_TIME')}`,
    });
    return {
      refreshToken: token,
    };
  }
}
