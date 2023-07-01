import { Controller, Get, Param, Query } from '@nestjs/common';
import { BeachesService } from './beaches.service';
import { MyPaginationQuery } from 'src/bases/pagination-query';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Beaches } from './entities/beaches.entity';

@Controller('beaches')
export class BeachesController {
  constructor(private BeachesService: BeachesService) {}

  @Get()
  async getAllByBeaches(
    @Query() options: MyPaginationQuery,
  ): Promise<Pagination<Beaches>> {
    return await this.BeachesService.getAllByBeaches(options);
  }

  @Get(':beachId')
  async getBeachById(@Param('beachId') beachId: number): Promise<Beaches> {
    return await this.BeachesService.getBeachById(beachId);
  }
}
