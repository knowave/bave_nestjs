import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * 특정 유저 조회
   * @param userId
   * @returns
   */
  async getUserById(userId: number): Promise<Users> {
    return await this.usersRepository.getUserById(userId);
  }

  /**
   * 유저 생성
   * @param createUserDto
   * @returns
   */
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    return await this.usersRepository.createUser(createUserDto);
  }

  /**
   * SignIn용 특정 유저 조회
   * @param email
   * @returns
   */
  async getUserByEmail(email: string): Promise<Users> {
    return await this.usersRepository.getUserByEmail(email);
  }

  /**
   * refreshToken 유효성 확인.
   * @param refreshToken
   * @param userId
   * @returns
   */
  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getUserById(userId);

    if (refreshToken == user.jwtToken) {
      return user;
    } else {
      throw new BadRequestException('유효하지 않는 토큰입니다.');
    }
  }

  /**
   * 발급받은 refreshToken 저장
   * @param refreshToken
   * @param userId
   * @returns
   */
  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    return await this.usersRepository.update(userId, {
      jwtToken: refreshToken,
    });
  }

  /**
   * 발급받은 refreshToken 삭제
   * @param userId
   * @returns
   */
  async removeRefreshToken(userId: number) {
    return await this.usersRepository.update(userId, { jwtToken: null });
  }

  /**
   * 회원 탈퇴
   * 30일 이상이면 Delete 30일 이하면 기한을 두고 softDelete
   * @param userId
   */
  async deleteUser(userId: number): Promise<void> {
    const user = await this.getUserById(userId);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    if (user.deletedAt >= thirtyDaysAgo) {
      await this.usersRepository.delete(userId);
    } else {
      await this.usersRepository.softDelete(userId);
    }
  }
}
