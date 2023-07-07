import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedsRepository } from './feeds.repository';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feeds } from './entities/feeds.entity';
import { updateFeedDto } from './dto/update-feed.dto';
import { UsersService } from '../users/users.service';
import { BeachesService } from '../beaches/beaches.service';
import { MyPaginationQuery } from '../../bases/pagination-query';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { FeedListResponseDto } from './dto/feed-list-response.dto';
import { MyPagination } from '../../bases/pagination-response';

@Injectable()
export class FeedsService {
  constructor(
    @InjectRepository(FeedsRepository)
    private readonly feedsRepository: FeedsRepository,
    private readonly usersService: UsersService,
    private readonly beachesService: BeachesService,
  ) {}

  async getAllByFeeds(
    options: MyPaginationQuery,
  ): Promise<Pagination<FeedListResponseDto>> {
    const query = await this.feedsRepository
      .createQueryBuilder('feed')
      .innerJoinAndSelect('feed.user', 'user')
      .innerJoinAndSelect('feed.beach', 'beach');

    const result = await paginate(query, options);

    const data = result.items.map((item) => {
      const dto = new FeedListResponseDto(item);
      dto.email = item.user.email;
      dto.username = item.user.username;
      dto.beachName = item.beach.beachName;
      return dto;
    });

    return new MyPagination<FeedListResponseDto>(data, result.meta);
  }

  /**
   * 피드 생성
   * @param createFeedDto
   * @param beach
   * @param user
   * @returns
   */
  async createFeedByBeach(createFeedDto: CreateFeedDto): Promise<Feeds> {
    const { userId, beachId }: CreateFeedDto = createFeedDto;

    const beach = await this.beachesService.getBeachById(beachId);
    const user = await this.usersService.getUserById(userId);

    return await this.feedsRepository.createFeedByBeach(
      createFeedDto,
      beach,
      user,
    );
  }

  /**
   * 피드 상세 조회
   * @param feedId
   * @returns
   */
  async getFeedById(feedId: number): Promise<Feeds> {
    return await this.feedsRepository.getFeedById(feedId);
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
    return await this.feedsRepository.updateFeed(feedId, updateFeedDto);
  }

  /**
   * 피드 삭제
   * @param feedId
   * @returns
   */
  async deleteFeed(feedId: number): Promise<void> {
    return await this.feedsRepository.deleteFeed(feedId);
  }
}
