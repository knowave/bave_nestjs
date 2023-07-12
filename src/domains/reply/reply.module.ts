import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { ReplyRepository } from './reply.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './entities/reply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reply])],
  providers: [ReplyService],
  controllers: [ReplyController],
  exports: [ReplyService, ReplyRepository],
})
export class ReplyModule {}
