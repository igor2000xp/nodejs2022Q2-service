import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
// import { PrismaService } from '../../prisma/prisma.service';
import { IUserForPrint } from '../user/models';
import { JwtService } from '@nestjs/jwt';
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
    if (user && user.password === pass) {
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
    const payload = { username: user.login, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
    // console.log(user);
    // return user;
  }

  async signup(createAuthDto: CreateAuthDto) {
    return createAuthDto;
  }

  async refresh(updateAuthDto: UpdateAuthDto) {
    return updateAuthDto.login;
  }
}
