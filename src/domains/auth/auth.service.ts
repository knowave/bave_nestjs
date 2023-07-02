import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';
import { AUTH_EXCEPTION } from '../../exception/error-code';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(userId: number, plainTextPassword: string): Promise<any> {
    const user = await this.usersService.getUserById(userId);
    await this.verifyPassword(plainTextPassword, user.password);
    const { password, ...result } = user;
    return result;
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatch = await compare(password, hashedPassword);
    if (!isPasswordMatch) {
      throw new BadRequestException(AUTH_EXCEPTION.AUTH_FAIL_VALIDATE);
    }
  }
}
