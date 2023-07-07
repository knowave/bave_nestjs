import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Feeds } from './entities/feeds.entity';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Beaches } from '../beaches/entities/beaches.entity';
import { Users } from '../users/entities/users.entity';
import { FEED_EXCEPTION } from '../../exception/error-code';
import { updateFeedDto } from './dto/update-feed.dto';

@Injectable()
export class FeedsRepository extends Repository<Feeds> {
  constructor(private readonly dataSource: DataSource) {
    super(Feeds, dataSource.createEntityManager());
  }

  /**
   * 피드 생성
   * @param createFeedDto
   * @param beach
   * @param user
   * @returns
   */
  async createFeedByBeach(
    createFeedDto: CreateFeedDto,
    beach: Beaches,
    user: Users,
  ): Promise<Feeds> {
    const { content, image }: CreateFeedDto = createFeedDto;

    const feed = this.create({
      content,
      image,
      beach,
      user,
    });

    return await this.save(feed);
  }

  /**
   * 피드 상세 조회
   * @param feedId
   * @returns
   */
  async getFeedById(feedId: number): Promise<Feeds> {
    const feed = await this.findOne({ where: { feedId } });

    if (!feed) {
      throw new NotFoundException(FEED_EXCEPTION.FEED_NOT_FOUND);
    }

    return feed;
  }

  /**
   * 특정 피드 수정
   * @param feedId
   * @param updateFeedDto
   * @returns
   */
  async updateFeed(
    feedId: number,
    updateFeedDto: updateFeedDto,
  ): Promise<Feeds> {
    const { content, image }: updateFeedDto = updateFeedDto;
    const feed = await this.getFeedById(feedId);

    if (content) {
      feed.content = content;
    }

    if (image) {
      feed.image = image;
    }

    return await this.save(feed);
  }

  /**
   * 피드 삭제
   * @param feedId 
   */
  async deleteFeed(feedId: number): Promise<void> {
    const feed = await this.getFeedById(feedId);

    await this.delete(feed.feedId);
  }
}
