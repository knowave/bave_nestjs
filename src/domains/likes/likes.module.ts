import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikesRepository } from './likes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './entities/likes.entity';
import { UsersModule } from '../users/users.module';
import { BeachesModule } from '../beaches/beaches.module';
import { FeedsModule } from '../feeds/feeds.module';
import { ReplyModule } from '../reply/reply.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Likes]),
    UsersModule,
    BeachesModule,
    FeedsModule,
    ReplyModule,
  ],
  providers: [LikesService, LikesRepository],
  controllers: [LikesController],
})
export class LikesModule {}
