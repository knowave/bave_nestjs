import { Module } from '@nestjs/common';
import { BeachesService } from './beaches.service';
import { BeachesController } from './beaches.controller';

@Module({
  providers: [BeachesService],
  controllers: [BeachesController]
})
export class BeachesModule {}
