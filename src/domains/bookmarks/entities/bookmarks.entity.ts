import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../bases/base.entity';
import { Users } from '../../users/entities/users.entity';
import { Feeds } from '../../feeds/entities/feeds.entity';
import { Beaches } from '../../beaches/entities/beaches.entity';

@Entity('bookmark')
export class Bookmarks extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'bookmark_id',
    comment: '북마크 ID',
  })
  bookmarkId: number;

  @ManyToOne(() => Users, (user) => user.bookmarkList)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  userId: number;

  @ManyToOne(() => Feeds, (feed) => feed.bookmarkList)
  @JoinColumn({ name: 'feed_id', referencedColumnName: 'feedId' })
  feedId: number;

  @ManyToOne(() => Beaches, (beach) => beach.bookmarkList)
  @JoinColumn({ name: 'beach_id', referencedColumnName: 'beachId' })
  beachId: number;
}
