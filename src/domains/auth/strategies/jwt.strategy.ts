import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../../users/users.repository';
import { ConfigService } from '@nestjs/config';
import { Users } from '../../users/entities/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any): Promise<Users> {
    const { userId } = payload;
    const user: Users = await this.usersRepository.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
