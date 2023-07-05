import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Users } from '../users/entities/users.entity';
import { CurrentUser } from 'src/dacorators/current-user.dacorator';
import { LoginResponseDto } from './dto/login-response.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  /**
   * 회원 가입
   * @param createUserDto
   * @returns
   */
  @Post('/sign-up')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<Users> {
    return await this.usersService.createUser(createUserDto);
  }

  /**
   * 로그인
   * @param user
   * @returns
   */
  @Post('/sign-in')
  async signIn(@CurrentUser() user: Users): Promise<LoginResponseDto> {
    const accessToken = this.authService.createAcessToken(user.userId);
    const refreshToken = this.authService.createRefreshToken(user.userId);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.userId);

    return { accessToken, refreshToken };
  }

  /**
   * 로그아웃
   * @param user
   */
  @Post('/sign-out')
  async signOut(@CurrentUser() user: Users): Promise<void> {
    await this.usersService.removeRefreshToken(user.userId);
  }

  /**
   * 리프레쉬 토큰 발급
   * @param user
   * @returns
   */
  @Post('/refresh-token')
  async refreshToken(@CurrentUser() user: Users): Promise<string> {
    const accessToken = await this.authService.createAcessToken(user.userId);

    return accessToken;
  }

  /**
   * 회원 정보 수정
   * @param userId
   * @param updateUserDto
   * @returns
   */
  @Patch()
  async updateUser(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { username, password } = updateUserDto;
    return await this.usersService.updateUser(userId, username, password);
  }

  /**
   * 회원 탈퇴
   * @param userId
   * @returns
   */
  @Delete('/account-withdrawal')
  async accountWithdrawal(@Param('userId') userId: number): Promise<void> {
    return await this.usersService.deleteUser(userId);
  }
}
