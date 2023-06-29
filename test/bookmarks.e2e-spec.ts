import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { asyncScheduler } from 'rxjs';
import { AppModule } from 'src/app.module';
import { BeachesService } from 'src/domains/beaches/beaches.service';
import { BookmarksRepository } from 'src/domains/bookmarks/bookmarks.repository';
import { BookmarksService } from 'src/domains/bookmarks/bookmarks.service';
import { UsersService } from 'src/domains/users/users.service';
import { RequestHelper } from 'src/utils/test.utils';
import { DataSource } from 'typeorm';

describe('북마크 테스트', () => {
  let app: INestApplication;
  let bookmarksService: BookmarksService;

  let requestHelper: RequestHelper;
  let dataSource: DataSource;
  let bookmarksRepository: BookmarksRepository;

  let userId: number | undefined;
  let feedId: number | undefined;
  let beachId: number | undefined;

  const bookmarksDomain: string = '/bookmarks';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        BookmarksService,
        BeachesService,
        UsersService,
        BookmarksRepository,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    bookmarksService = moduleFixture.get(BookmarksService);
    dataSource = moduleFixture.get(DataSource);

    await dataSource.synchronize(true);

    requestHelper = new RequestHelper(app);

    await app.init();
  });

  describe('해수욕장 북마크', async () => {
    beachId = 1;
  });

  afterAll(async () => {
    await app.close();
    await bookmarksRepository.clear();
  });
});
