import { Injectable } from '@nestjs/common';
import { Beaches } from './entities/beaches.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BeachesRepository extends Repository<Beaches> {
  constructor(private readonly dataSource: DataSource) {
    super(Beaches, dataSource.createEntityManager());
  }
}
