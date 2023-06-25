import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CreateOnlyEntity {
  @CreateDateColumn()
  createdAt?: Date;
}

export abstract class DeleteBaseEntity extends CreateOnlyEntity {
  @DeleteDateColumn()
  deletedAt?: Date;
}

export abstract class UpdateDeleteBaseEntity extends CreateOnlyEntity {
  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    comment: '생성일',
    type: 'timestamp',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '수정일',
    type: 'timestamp',
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    comment: '삭제일',
    nullable: true,
    type: 'timestamp',
  })
  deletedAt?: Date;
}
