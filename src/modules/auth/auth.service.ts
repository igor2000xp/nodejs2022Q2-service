import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
// import { PrismaService } from '../../prisma/prisma.service';
import { IUserForPrint } from '../user/models';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
// import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService, // private prisma: PrismaService,
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

  // async login(createAuthDto: CreateAuthDto) {
  //   const payload = {
  //     username: createAuthDto.login,
  //     sub: createAuthDto.password,
  //   };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async login(user: UpdateAuthDto) {
    const userByLog = await this.usersService.userByLogin({
      login: user.login,
    });
    console.log(user);
    console.log(userByLog);
    const payload = {
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
  }

  async signup(createAuthDto: CreateAuthDto) {
    return createAuthDto;
  }

  async refresh(updateAuthDto: UpdateAuthDto) {
    return updateAuthDto.login;
  }
}
