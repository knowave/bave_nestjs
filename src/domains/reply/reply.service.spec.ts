import { Test, TestingModule } from '@nestjs/testing';
import { ReplyService } from './reply.service';
import { ReplyRepository } from './reply.repository';

const mockRepository = {
  getAllReplyByFeed: jest.fn(),
  createReplyByFeed: jest.fn(),
  updateReplyByFeed: jest.fn(),
  deleteReplyByFeed: jest.fn(),
};

describe('ReplyService', () => {
  let service: ReplyService;
  let repository: ReplyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReplyService,
        {
          provide: ReplyRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ReplyService>(ReplyService);
    repository = module.get<ReplyRepository>(ReplyRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
