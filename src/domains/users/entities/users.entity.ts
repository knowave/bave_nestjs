import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '../../../bases/base.entity';

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
}
