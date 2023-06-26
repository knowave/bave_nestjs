import { Test, TestingModule } from '@nestjs/testing';
import { BookmarksService } from './bookmarks.service';
import { BookmarksRepository } from './bookmarks.repository';

const mockRepository = {
  bookmarkByFeed: jest.fn(),
  bookmarkByBeach: jest.fn(),
};

describe('BookmarksService', () => {
  let service: BookmarksService;
  let repository: BookmarksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookmarksService,
        {
          provide: BookmarksRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BookmarksService>(BookmarksService);
    repository = module.get<BookmarksRepository>(BookmarksRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
