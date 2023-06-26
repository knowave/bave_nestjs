import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../bases/base.entity';

@Entity()
export class Likes extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'like_id',
    comment: '좋아요 ID',
  })
  likeId: number;
}
