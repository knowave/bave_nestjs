import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../bases/base.entity";

@Entity()
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
}