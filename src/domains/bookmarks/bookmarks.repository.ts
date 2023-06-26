import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Bookmarks } from './entities/bookmarks.entity';

@Injectable()
export class BookmarksRepository extends Repository<Bookmarks> {
  constructor(private readonly dataSource: DataSource) {
    super(Bookmarks, dataSource.createEntityManager());
  }
}
