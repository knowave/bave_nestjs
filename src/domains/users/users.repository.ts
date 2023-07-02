import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { USER_EXCEPTION } from '../../exception/error-code';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(private readonly dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  async getUserById(userId: number): Promise<Users> {
    const user = await this.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException(USER_EXCEPTION.USER_NOT_FOUND);
    }

    return user;
  }
}
