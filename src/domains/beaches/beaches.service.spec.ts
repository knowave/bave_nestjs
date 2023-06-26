import { Test, TestingModule } from '@nestjs/testing';
import { BeachesService } from './beaches.service';
import { BeachesRepository } from './beaches.repository';

const mockRepository = {
  getAllByBeaches: jest.fn(),
  getBeachById: jest.fn(),
};

describe('BeachesService', () => {
  let service: BeachesService;
  let repository: BeachesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BeachesService,
        {
          provide: BeachesRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BeachesService>(BeachesService);
    repository = module.get<BeachesRepository>(BeachesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
