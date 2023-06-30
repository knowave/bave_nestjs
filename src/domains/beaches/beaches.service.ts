import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BeachesRepository } from './beaches.repository';
import { MyPaginationQuery } from 'src/bases/pagination-query';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Beaches } from './entities/beaches.entity';
import { BEACH_EXCEPTION } from 'src/exception/error-code';
import { promises } from 'dns';

@Injectable()
export class BeachesService {
  constructor(
    @InjectRepository(BeachesRepository)
    private readonly beachesRepository: BeachesRepository,
  ) {}

  async getAllBeaches(
    options: MyPaginationQuery,
  ): Promise<Pagination<Beaches>> {
    const query = this.beachesRepository.createQueryBuilder('beach');
    query.getRawMany();

    const pagination = await paginate<Beaches>(query, options);

    if (pagination.items.length === 0) {
      throw new NotFoundException(BEACH_EXCEPTION.BEACH_NOT_FOUND);
    }

    return pagination;
  }

  async getBeachById(beachId: number): Promise<Beaches> {
    return await this.beachesRepository.getBeachById(beachId);
  }
}
