import { Test, TestingModule } from '@nestjs/testing';
import { FeedsService } from './feeds.service';
import { FeedsRepository } from './feeds.repository';

const mockRepository = {
  getAllFeeds: jest.fn(),
  getFeedById: jest.fn(),
  createFeed: jest.fn(),
  updateFeed: jest.fn(),
  deleteFeed: jest.fn(),
};

describe('FeedsService', () => {
  let service: FeedsService;
  let repository: FeedsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedsService,
        {
          provide: FeedsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FeedsService>(FeedsService);
    repository = module.get<FeedsRepository>(FeedsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
