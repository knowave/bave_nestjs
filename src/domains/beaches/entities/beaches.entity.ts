import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../bases/base.entity';
import { Feeds } from '../../feeds/entities/feeds.entity';
import { Bookmarks } from '../../bookmarks/entities/bookmarks.entity';
import { Likes } from '../../likes/entities/likes.entity';

@Entity('beach')
export class Beaches extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'beach_id',
    comment: '해수욕장 ID',
  })
  beachId: number;

  @Column('varchar', {
    name: 'sido_name',
    comment: '시 이름',
    nullable: false,
  })
  sidoName: string;

  @Column('varchar', {
    name: 'gugun_name',
    comment: '구/군 이름',
    nullable: false,
  })
  gugunName: string;

  @Column('varchar', {
    name: 'beach_name',
    comment: '해수욕장 이름',
    nullable: false,
  })
  beachName: string;

  @Column('varchar', {
    name: 'latitude',
    comment: '위도',
    nullable: false,
  })
  latitude: string;

  @Column('varchar', {
    name: 'longitude',
    comment: '경도',
    nullable: false,
  })
  longitude: string;

  @OneToMany(() => Feeds, (feed) => feed.beach, { eager: false })
  feedList?: Feeds[];

  @OneToMany(() => Bookmarks, (bookmark) => bookmark.beachId)
  @JoinColumn({ name: 'bookmark_id', referencedColumnName: 'bookmarkId' })
  bookmarkList?: Bookmarks[];

  @OneToMany(() => Likes, (like) => like.beachId)
  @JoinColumn({ name: 'like_id', referencedColumnName: 'likeId' })
  likeId?: number;
}
