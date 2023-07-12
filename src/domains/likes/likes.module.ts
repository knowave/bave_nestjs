import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikesRepository } from './likes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './entities/likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Likes])],
  providers: [LikesService, LikesRepository],
  controllers: [LikesController],
})
export class LikesModule {}
