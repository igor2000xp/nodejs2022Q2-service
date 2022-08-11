import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthEntity } from './entities/auth.entity';

// Implementing Passport JWT https://docs.nestjs.com/security/authentication#implementing-passport-jwt
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: AuthEntity) {
    const { userId, login } = payload;

    return { userId, login };
  }
}
