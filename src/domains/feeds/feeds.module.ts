import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feeds } from './entities/feeds.entity';
import { UsersModule } from '../users/users.module';
import { BeachesModule } from '../beaches/beaches.module';
import { FeedsRepository } from './feeds.repository';
import { UsersService } from '../users/users.service';
import { BeachesService } from '../beaches/beaches.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feeds]), UsersModule, BeachesModule],
  providers: [FeedsService, FeedsRepository, UsersService, BeachesService],
  controllers: [FeedsController],
  exports: [FeedsService],
})
export class FeedsModule {}
