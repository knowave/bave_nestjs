import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../bases/base.entity';
import { Users } from '../../users/entities/users.entity';
import { Beaches } from '../../beaches/entities/beaches.entity';
import { Reply } from '../../reply/entities/reply.entity';
import { Bookmarks } from '../../bookmarks/entities/bookmarks.entity';
import { Likes } from '../../likes/entities/likes.entity';

@Entity('feed')
export class Feeds extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'feed_id',
    comment: '피드 ID',
  })
  feedId: number;

  @Column('varchar', {
    name: 'content',
    comment: '피드 글',
    nullable: false,
  })
  content: string;

  @Column('longtext', {
    name: 'feed_image',
    comment: 'feed image',
    nullable: true,
  })
  image!: string[] | null;

  @ManyToOne(() => Users, (user) => user.feedList)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  userId: number;

  @ManyToOne(() => Beaches, (beach) => beach.feedList)
  @JoinColumn({ name: 'beach_id', referencedColumnName: 'beachId' })
  beachId: number;

  @OneToMany(() => Reply, (reply) => reply.feedId)
  @JoinColumn({ name: 'reply_id', referencedColumnName: 'replyId' })
  replyList: Reply[];

  @OneToMany(() => Bookmarks, (bookmark) => bookmark.feedId)
  @JoinColumn({ name: 'bookmark_id', referencedColumnName: 'bookmarkId' })
  bookmarkList: Bookmarks[];

  @OneToMany(() => Likes, (like) => like.feedId)
  @JoinColumn({ name: 'like_id', referencedColumnName: 'likeId' })
  likeId: number;
}
