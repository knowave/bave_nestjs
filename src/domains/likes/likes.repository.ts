import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Likes } from './entities/likes.entity';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikesRepository extends Repository<Likes> {
  constructor(private readonly dataSource: DataSource) {
    super(Likes, dataSource.createEntityManager());
  }

  /**
   * 좋아요 조회
   * @param likeDto
   * @returns
   */
  async getLikeById(likeDto: LikeDto): Promise<Likes> {
    const { userId, beachId, feedId, replyId }: LikeDto = likeDto;

    return await this.findOne({ where: { userId, beachId, feedId, replyId } });
  }

  async createLike(likeDto: LikeDto): Promise<Likes> {
    const { userId, beachId, feedId, replyId }: LikeDto = likeDto;

    const like = this.create({
      userId,
      beachId,
      feedId,
      replyId,
    });

    return await this.save(like);
  }

  async cancelLike(likeDto: LikeDto): Promise<void> {
    const { userId, beachId, feedId, replyId }: LikeDto = likeDto;

    await this.delete({ userId, beachId, feedId, replyId });
  }
}
