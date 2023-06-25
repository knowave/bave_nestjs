import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';

@Module({
  providers: [FeedsService],
  controllers: [FeedsController]
})
export class FeedsModule {}
