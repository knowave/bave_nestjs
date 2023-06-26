import { Injectable } from '@nestjs/common';
import { DataSource, Like, Repository } from 'typeorm';
import { Likes } from './entities/likes.entity';

@Injectable()
export class LikesRepository extends Repository<Likes> {
  constructor(private readonly dataSource: DataSource) {
    super(Likes, dataSource.createEntityManager());
  }
}
