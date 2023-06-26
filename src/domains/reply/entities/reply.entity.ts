import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../bases/base.entity';
import { Users } from '../../users/entities/users.entity';
import { Feeds } from '../../feeds/entities/feeds.entity';
import { Likes } from '../../likes/entities/likes.entity';

@Entity()
export class Reply extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'reply_id',
    comment: '댓글 ID',
  })
  replyId: number;

  @Column('varchar', {
    name: 'contents',
    comment: '댓글',
    nullable: false,
  })
  contents: string;

  @ManyToOne(() => Users, (user) => user.replyList)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  userId: number;

  @ManyToOne(() => Feeds, (feed) => feed.replyList)
  @JoinColumn({ name: 'feed_id', referencedColumnName: 'feedId' })
  feedId: number;

  @OneToMany(() => Likes, (like) => like.replyId)
  @JoinColumn({ name: 'like_id', referencedColumnName: 'likeId' })
  likeId: number;
}
