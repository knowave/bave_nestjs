import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikesRepository } from './likes.repository';
import { LikeDto } from './dto/like.dto';
import { Likes } from './entities/likes.entity';
import { UsersService } from '../users/users.service';
import { BeachesService } from '../beaches/beaches.service';
import { FeedsService } from '../feeds/feeds.service';
import { ReplyService } from '../reply/reply.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikesRepository)
    private readonly likesRepository: LikesRepository,
    private readonly usersService: UsersService,
    private readonly beachesService: BeachesService,
    private readonly feedsService: FeedsService,
    private readonly replyService: ReplyService,
  ) {}

  /**
   * 해수욕장 좋아요 조회
   * @param likeDto
   * @returns
   */
  async getLikeByBeach(likeDto: LikeDto): Promise<Likes> {
    const user = await this.usersService.getUserById(likeDto.userId);
    const beach = await this.beachesService.getBeachById(likeDto.beachId);

    likeDto.userId = user.userId;
    likeDto.beachId = beach.beachId;

    return await this.likesRepository.getLikeById(likeDto);
  }

  /**
   * 피드 좋아요 조회
   * @param likeDto
   * @returns
   */
  async getLikeByFeed(likeDto: LikeDto): Promise<Likes> {
    const user = await this.usersService.getUserById(likeDto.userId);
    const feed = await this.feedsService.getFeedById(likeDto.feedId);

    likeDto.userId = user.userId;
    likeDto.feedId = feed.feedId;

    return await this.likesRepository.getLikeById(likeDto);
  }

  /**
   * 댓글 좋아요 조회
   * @param likeDto
   * @returns
   */
  async getLikeByReply(likeDto: LikeDto): Promise<Likes> {
    const user = await this.usersService.getUserById(likeDto.userId);

    likeDto.userId = user.userId;
    // TODO ReplyService implement

    return await this.likesRepository.getLikeById(likeDto);
  }

  /**
   * 해수욕장 좋아요
   * @param likeDto
   * @returns
   */
  async createLikeByBeach(likeDto: LikeDto): Promise<Likes> {
    const user = await this.usersService.getUserById(likeDto.userId);
    const beach = await this.beachesService.getBeachById(likeDto.beachId);

    likeDto.userId = user.userId;
    likeDto.beachId = beach.beachId;

    return await this.likesRepository.createLike(likeDto);
  }

  /**
   * 피드 좋아요
   * @param likeDto 
   * @returns 
   */
  async createLikeByFeed(likeDto: LikeDto): Promise<Likes> {
    const user = await this.usersService.getUserById(likeDto.userId);
    const feed = await this.feedsService.getFeedById(likeDto.feedId);

    likeDto.userId = user.userId;
    likeDto.feedId = feed.feedId;

    return await this.likesRepository.createLike(likeDto);
  }

  /**
   * 댓글 좋아요
   * @param likeDto 
   * @returns 
   */
  async createLikeByReply(likeDto: LikeDto): Promise<Likes> {
    const user = await this.usersService.getUserById(likeDto.userId);
    // TODO ReplyService implement

    likeDto.userId = user.userId;

    return await this.likesRepository.createLike(likeDto);
  }

  /**
   * 해수욕장 좋아요 취소
   * @param likeDto 
   * @returns 
   */
  async cancelLikeByBeach(likeDto: LikeDto): Promise<void> {
    const user = await this.usersService.getUserById(likeDto.userId);
    const beach = await this.beachesService.getBeachById(likeDto.beachId);

    likeDto.userId = user.userId;
    likeDto.beachId = beach.beachId;

    return await this.likesRepository.cancelLike(likeDto);
  }

  /**
   * 피드 좋아요 취소
   * @param likeDto 
   * @returns 
   */
  async cancelLikeByFeed(likeDto: LikeDto): Promise<void> {
    const user = await this.usersService.getUserById(likeDto.userId);
    const feed = await this.feedsService.getFeedById(likeDto.feedId);

    likeDto.userId = user.userId;
    likeDto.feedId = feed.feedId;

    return await this.likesRepository.cancelLike(likeDto);
  }

  /**
   * 댓글 좋아요 취소
   * @param likeDto 
   * @returns 
   */
  async cancelLikeByReply(likeDto: LikeDto): Promise<void> {
    const user = await this.usersService.getUserById(likeDto.userId);
    // TODO ReplyService Implement

    likeDto.userId = user.userId;

    return await this.likesRepository.cancelLike(likeDto);
  }
}
