import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../bases/base.entity';

@Entity('bookmark')
export class Bookmarks extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'bookmark_id',
    comment: '북마크 ID',
  })
  bookmarkId: number;
}
