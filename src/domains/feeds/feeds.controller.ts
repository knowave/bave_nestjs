import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { Feeds } from './entities/feeds.entity';
import { CreateFeedDto } from './dto/create-feed.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Users } from '../users/entities/users.entity';
import { updateFeedDto } from './dto/update-feed.dto';
import { MyPaginationQuery } from 'src/bases/pagination-query';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FeedListResponseDto } from './dto/feed-list-response.dto';

@Controller('feeds')
export class FeedsController {
  constructor(private feedsService: FeedsService) {}

  @Get('')
  async getAllByFeeds(
    @Query() query: MyPaginationQuery,
  ): Promise<Pagination<FeedListResponseDto>> {
    return await this.feedsService.getAllByFeeds(query);
  }

  @Get(':feedId')
  async getFeedById(@Param('feedId') feedId: number): Promise<Feeds> {
    return await this.feedsService.getFeedById(feedId);
  }

  @Post(':beachId')
  async createFeedByBeach(
    @Param('beachId')
    beachId: number,
    @Body()
    createFeedDto: CreateFeedDto,
    @CurrentUser() user: Users,
  ): Promise<Feeds> {
    createFeedDto.beachId = beachId;
    createFeedDto.userId = user.userId;

    return await this.feedsService.createFeedByBeach(createFeedDto);
  }

  @Patch(':feedId')
  async updateFeed(
    @Param('feedId') feedId: number,
    @Body() updateFeedDto: updateFeedDto,
  ): Promise<Feeds> {
    return await this.feedsService.updateFeed(feedId, updateFeedDto);
  }

  @Delete(':feedId')
  async deleteFeed(@Param('feedId') feedId: number): Promise<void> {
    return await this.feedsService.deleteFeed(feedId);
  }
}
