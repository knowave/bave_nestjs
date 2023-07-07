import { OmitType } from '@nestjs/swagger';
import { Feeds } from '../entities/feeds.entity';
import { omit } from '../../../utils/dto.utils';

export class FeedListResponseDto extends OmitType(Feeds, [
  'user',
  'beach',
  'deletedAt',
]) {
  email: string;
  userName: string;
  beachName: string;

  constructor(partial?: Partial<Feeds>) {
    super();
    return omit(partial, ['user', 'beach', 'deletedAt']);
  }
}
