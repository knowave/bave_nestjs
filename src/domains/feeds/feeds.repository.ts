import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Feeds } from './entities/feeds.entity';

@Injectable()
export class FeedsRepository extends Repository<Feeds> {
  constructor(private readonly dataSource: DataSource) {
    super(Feeds, dataSource.createEntityManager());
  }
}
