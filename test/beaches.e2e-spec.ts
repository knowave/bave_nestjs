import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { BeachesRepository } from '../src/domains/beaches/beaches.repository';
import { BeachesService } from '../src/domains/beaches/beaches.service';
import { BEACH_EXCEPTION } from '../src/exception/error-code';
import { RequestHelper } from '../src/utils/test.utils';
import { DataSource } from 'typeorm';

describe('해수욕장 조회 테스트', () => {
  let app: INestApplication;
  let beachesService: BeachesService;

  let requestHelper: RequestHelper;
  let dataSource: DataSource;

  let beachId: number | undefined;

  const beachesDomain: string = '/beaches';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [BeachesRepository, BeachesService],
    }).compile();

    app = moduleFixture.createNestApplication();
    beachesService = moduleFixture.get(BeachesService);
    dataSource = moduleFixture.get(DataSource);

    await dataSource.synchronize(true);

    requestHelper = new RequestHelper(app);

    await app.init();
  });

  describe('해수욕장 조회', () => {
    it('전체 조회 성공', async () => {
      const response = await requestHelper.get(
        `${beachesDomain}?page=1&limit=10`,
      );
      const meta = response.body.meta;

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(meta.totalPages).toBe(4);
      expect(meta.itemsPerPage).toBe(10);
    });

    it('상세 조회 성공', async () => {
      beachId = 1;

      const response = await requestHelper.get(`${beachesDomain}/${beachId}`);
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(body.beachId).toBe(beachId);
      expect(body).not.toBeNull();
    });

    it('beachId가 없을 시 상세 조회 실패', async () => {
      beachId = 999999;

      const response = await requestHelper.get(`${beachesDomain}/${beachId}`);
      const body = response.body();

      expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(body.code).toBe(BEACH_EXCEPTION.BEACH_NOT_FOUND.code);
      expect(body.message).toBe(BEACH_EXCEPTION.BEACH_NOT_FOUND.message);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
