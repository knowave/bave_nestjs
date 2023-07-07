import { Module } from '@nestjs/common';
import { BeachesService } from './beaches.service';
import { BeachesController } from './beaches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beaches } from './entities/beaches.entity';
import { BeachesRepository } from './beaches.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Beaches])],
  providers: [BeachesService, BeachesRepository],
  controllers: [BeachesController],
  exports: [BeachesService, BeachesRepository],
})
export class BeachesModule {}
