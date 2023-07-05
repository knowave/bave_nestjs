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

  /**
   * 비밀번호 유효성 검사한 유저 정보 조회
   * @param userId
   * @param plainTextPassword
   * @returns
   */
  async validateUser(userId: number, plainTextPassword: string): Promise<any> {
    const user = await this.usersService.getUserById(userId);
    await this.verifyPassword(plainTextPassword, user.password);
    const { password, ...result } = user;
    return result;
  }

  /**
   * 비밀번호 비교
   * @param password
   * @param hashedPassword
   */
  private async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatch = await compare(password, hashedPassword);
    if (!isPasswordMatch) {
      throw new BadRequestException(AUTH_EXCEPTION.AUTH_FAIL_VALIDATE);
    }
  }

  // AccessToken 발급
  createAcessToken(userId: number) {
    const payload = { userId };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}`,
    });
  }

  /**
   * RefreshToken 발급
   * @param userId
   * @returns
   */
  createRefreshToken(userId: string) {
    const payload = { userId };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}`,
    });
  }
}
