import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { USER_EXCEPTION } from '../../exception/error-code';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(private readonly dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  /**
   * 특정 유저 조회
   * @param userId
   * @returns
   */
  async getUserById(userId: number): Promise<Users> {
    const user = await this.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException(USER_EXCEPTION.USER_NOT_FOUND);
    }

    return user;
  }

  /**
   * 유저 생성
   * @param createUserDto
   * @returns
   */
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const { email, username, password, confirmPassword } = createUserDto;

    const create = await this.create({
      email,
      username,
      password,
    });

    const user = await this.findOne({ where: { email } });

    if (user != null) {
      throw new BadRequestException(USER_EXCEPTION.EXIST_USER);
    }

    if (password !== confirmPassword) {
      throw new BadRequestException(USER_EXCEPTION.NOT_MATCH_PASSWORD);
    }

    await user.hashPassword(password);
    return await this.save(create);
  }

  /**
   * SignIn용 특정 유저 조회
   * @param email
   * @returns
   */
  async getUserByEmail(email: string): Promise<Users> {
    const user = await this.findOne({
      select: ['userId', 'email', 'password', 'username'],
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(USER_EXCEPTION.USER_NOT_FOUND);
    }

    return user;
  }

  /**
   * 발급받은 refreshToken 저장
   * @param refreshToken
   * @param userId
   * @returns
   */
  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    return await this.update(userId, { jwtToken: refreshToken });
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
   * 발급받은 refreshToken 삭제
   * @param userId
   * @returns
   */
  async removeRefreshToken(userId: number) {
    return await this.update(userId, { jwtToken: null });
  }
}
