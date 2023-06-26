import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  BeforeUpdate,
} from 'typeorm';
import { BaseEntity } from '../../../bases/base.entity';
import { Bookmarks } from '../../bookmarks/entities/bookmarks.entity';
import { Likes } from '../../likes/entities/likes.entity';
import { Reply } from '../../reply/entities/reply.entity';
import { Feeds } from '../../feeds/entities/feeds.entity';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'user_id',
    comment: '회원 아이디',
  })
  userId: number;

  @Column('varchar', {
    name: 'email',
    comment: '회원 이메일',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column('varchar', {
    name: 'password',
    comment: '패스워드',
    nullable: false,
    select: false,
  })
  password: string;

  @Column('varchar', {
    name: 'username',
    comment: '회원 사용 이름',
    nullable: false,
  })
  username: string;

  @Column('longtext', {
    name: 'jwt_token',
    comment: 'jwt refresh token',
    nullable: true,
    select: false,
  })
  jwtToken!: string | null;

  @OneToMany(() => Bookmarks, (bookmark) => bookmark.userId)
  @JoinColumn({ name: 'bookmark_id', referencedColumnName: 'bookmarkId' })
  bookmarkList: Bookmarks[];

  @OneToMany(() => Likes, (like) => like.userId)
  @JoinColumn({ name: 'like_id', referencedColumnName: 'likeId' })
  likeId: number;

  @OneToMany(() => Reply, (reply) => reply.userId)
  @JoinColumn({ name: 'reply_id', referencedColumnName: 'replyId' })
  replyList: Reply[];

  @OneToMany(() => Feeds, (feed) => feed.userId)
  feedList: Feeds[];

  /**
   * 비밀번호 암호화
   * @param password
   */
  async hashPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 12);
  }

  @BeforeUpdate()
  async updateDate(): Promise<void> {
    this.updatedAt = await new Date();
  }
}
