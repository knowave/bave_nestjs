import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Likes } from './entities/likes.entity';

@Injectable()
export class LikesRepository extends Repository<Likes> {
  constructor(private readonly dataSource: DataSource) {
    super(Likes, dataSource.createEntityManager());
  }

  /**
   * 해수욕장 좋아요 조회
   * @param userId
   * @param beachId
   * @returns
   */
  async getLikeByBeach(userId: number, beachId: number): Promise<Likes> {
    return await this.findOne({ where: { userId, beachId } });
  }

  /**
   * 피드 좋아요 조회
   * @param userId
   * @param feedId
   * @returns
   */
  async getLikeByFeed(userId: number, feedId: number): Promise<Likes> {
    return await this.findOne({ where: { userId, feedId } });
  }

  /**
   * 댓글 좋아요 조회
   * @param userId
   * @param replyId
   * @returns
   */
  async getLikeByReply(userId: number, replyId: number): Promise<Likes> {
    return await this.findOne({ where: { userId, replyId } });
  }

  /**
   * 해수욕장 좋아요
   * @param userId
   * @param beachId
   * @returns
   */
  async createLikeByBeach(userId: number, beachId: number): Promise<Likes> {
    const create = this.create({
      userId,
      beachId,
    });

    return await this.save(create);
  }

  /**
   * 피드 좋아요 생성
   * @param userId
   * @param feedId
   * @returns
   */
  async createLikeByFeed(userId: number, feedId: number): Promise<Likes> {
    const create = this.create({
      userId,
      feedId,
    });

    return await this.save(create);
  }

  /**
   * 댓글 좋아요 생성
   * @param userId
   * @param replyId
   * @returns
   */
  async createLikeByReply(userId: number, replyId: number): Promise<Likes> {
    const create = this.create({
      userId,
      replyId,
    });

    return await this.save(create);
  }

  /**
   * 해수욕장 좋아요 취소
   * @param userId
   * @param beachId
   */
  async cancelLikeByBeach(userId: number, beachId: number): Promise<void> {
    await this.delete({ userId, beachId });
  }

  /**
   * 피드 좋아요 취소
   * @param userId
   * @param feedId
   */
  async cancelLikeByFeed(userId: number, feedId: number): Promise<void> {
    await this.delete({ userId, feedId });
  }

  async cancelLikeByReply(userId: number, replyId: number): Promise<void> {
    await this.delete({ userId, replyId });
  }
}
