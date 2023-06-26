import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beaches } from '../domains/beaches/entities/beaches.entity';
import { Bookmarks } from '../domains/bookmarks/entities/bookmarks.entity';
import { Feeds } from '../domains/feeds/entities/feeds.entity';
import { Likes } from '../domains/likes/entities/likes.entity';
import { Reply } from '../domains/reply/entities/reply.entity';
import { Users } from '../domains/users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Beaches, Bookmarks, Feeds, Likes, Reply, Users],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabasesModule {}
