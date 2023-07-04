import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * 특정 유저 조회
   * @param userId 
   * @returns 
   */
  @Get(':userId')
  async getUserById(@Param('userId') userId: number): Promise<Users> {
    return await this.usersService.getUserById(userId);
  }
}
