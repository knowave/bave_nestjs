import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Reply } from './entities/reply.entity';

@Injectable()
export class ReplyRepository extends Repository<Reply> {
  constructor(private readonly dataSource: DataSource) {
    super(Reply, dataSource.createEntityManager());
  }
}
