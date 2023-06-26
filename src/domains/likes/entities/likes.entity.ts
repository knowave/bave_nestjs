import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../bases/base.entity';
import { Users } from '../../users/entities/users.entity';
import { Feeds } from '../../feeds/entities/feeds.entity';
import { Reply } from '../../reply/entities/reply.entity';
import { Beaches } from '../../beaches/entities/beaches.entity';

@Entity()
export class Likes extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'like_id',
    comment: '좋아요 ID',
  })
  likeId: number;

  @ManyToOne(() => Users, (user) => user.likeId)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  userId: number;

  @ManyToOne(() => Feeds, (feed) => feed.likeId)
  @JoinColumn({ name: 'feed_id', referencedColumnName: 'feedId' })
  feedId: number;

  @ManyToOne(() => Reply, (reply) => reply.likeId)
  @JoinColumn({ name: 'reply_id', referencedColumnName: 'replyId' })
  replyId: number;

  @ManyToOne(() => Beaches, (beach) => beach.likeId)
  @JoinColumn({ name: 'beach_id', referencedColumnName: 'beachId' })
  beachId: number;
}
