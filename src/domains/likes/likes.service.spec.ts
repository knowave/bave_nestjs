import { Test, TestingModule } from '@nestjs/testing';
import { LikesService } from './likes.service';
import { LikesRepository } from './likes.repository';

const mockRepository = {
  likeByBeach: jest.fn(),
  likeByFeed: jest.fn(),
  likeByReply: jest.fn(),
};

describe('LikesService', () => {
  let service: LikesService;
  let repository: LikesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikesService,
        {
          provide: LikesRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LikesService>(LikesService);
    repository = module.get<LikesRepository>(LikesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
