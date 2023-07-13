import { BadRequestException, Controller, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Users } from '../users/entities/users.entity';
import { LikeDto } from './dto/like.dto';
import { LIKE_EXCEPTION } from '../../exception/error-code';

@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post('/beach/:beachId')
  async likeByBeach(
    @Param('beachId') beachId: number,
    @CurrentUser() user: Users,
    likeDto: LikeDto,
  ) {
    likeDto.beachId = beachId;
    likeDto.userId = user.userId;
    const beachLike = await this.likesService.getLikeByBeach(likeDto);

    try {
      if (!beachLike) {
        return await this.likesService.createLikeByBeach(likeDto);
      } else {
        return await this.likesService.cancelLikeByBeach(likeDto);
      }
    } catch (error) {
      console.log('ERROR: ', error);
      throw new BadRequestException(LIKE_EXCEPTION);
    }
  }

  @Post('feed/:feedId')
  async likeByFeed(
    @Param('feedId') feedId: number,
    @CurrentUser() user: Users,
    likeDto: LikeDto,
  ) {
    likeDto.userId = user.userId;
    likeDto.feedId = feedId;
    const feedLike = await this.likesService.getLikeByFeed(likeDto);

    try {
      if (!feedLike) {
        return await this.likesService.createLikeByFeed(likeDto);
      } else {
        return await this.likesService.cancelLikeByFeed(likeDto);
      }
    } catch (error) {
      console.log('ERROR: ', error);
      throw new BadRequestException(LIKE_EXCEPTION);
    }
  }

  @Post('reply/:replyId')
  async likeByReply(
    @Param('replyId') replyId: number,
    @CurrentUser() user: Users,
    likeDto: LikeDto,
  ) {
    likeDto.userId = user.userId;
    likeDto.replyId = replyId;
    const replyLike = await this.likesService.getLikeByReply(likeDto);

    try {
      if (!replyLike) {
        return await this.likesService.createLikeByReply(likeDto);
      } else {
        return await this.likesService.cancelLikeByReply(likeDto);
      }
    } catch (error) {
      console.log('ERROR: ', error);
      throw new BadRequestException(LIKE_EXCEPTION);
    }
  }
}
