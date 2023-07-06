import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Feeds } from './entities/feeds.entity';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Beaches } from '../beaches/entities/beaches.entity';
import { Users } from '../users/entities/users.entity';

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
}
