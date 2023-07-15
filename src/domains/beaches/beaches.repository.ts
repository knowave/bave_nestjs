import { Injectable, NotFoundException } from '@nestjs/common';
import { Beaches } from './entities/beaches.entity';
import { DataSource, Repository } from 'typeorm';
import { BEACH_EXCEPTION } from '../../exception/error-code';

@Injectable()
export class BeachesRepository extends Repository<Beaches> {
  constructor(private readonly dataSource: DataSource) {
    super(Beaches, dataSource.createEntityManager());
  }

  async getBeachById(beachId: number): Promise<Beaches> {
    const beach = await this.findOne({ where: { beachId } });

    if (!beach) {
      throw new NotFoundException(BEACH_EXCEPTION.BEACH_NOT_FOUND);
    }

    return beach;
  }
}
