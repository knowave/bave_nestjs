import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../bases/base.entity';

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
}
