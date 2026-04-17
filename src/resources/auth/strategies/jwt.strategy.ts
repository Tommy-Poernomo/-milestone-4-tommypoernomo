import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'fallback_secret_key', // Menambahkan fallback atau tanda '!'
    });
  }

  async validate(payload: any) {
    // Data ini akan masuk ke request user (req.user)
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}