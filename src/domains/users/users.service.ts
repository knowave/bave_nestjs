import { Injectable } from '@nestjs/common';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(private readonly usersService: UsersService) {}

    async getUserById(userId: number): Promise<Users> {
        return await this.usersService.getUserById(userId)
    }
}
