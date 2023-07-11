import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabasesModule } from './databases/databases.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { BeachesModule } from './domains/beaches/beaches.module';
import { AuthModule } from './domains/auth/auth.module';
import { UsersModule } from './domains/users/users.module';
import { FeedsModule } from './domains/feeds/feeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    BeachesModule,
    AuthModule,
    UsersModule,
    FeedsModule,
    DatabasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
