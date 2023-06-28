import { Test, TestingModule } from '@nestjs/testing';
import { BeachesService } from './beaches.service';
import { BeachesRepository } from './beaches.repository';
import { Beaches } from './entities/beaches.entity';
import { NotFoundException } from '@nestjs/common';

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

  describe('BeachesService', () => {
    it('should return a list of Beaches', async () => {
      const paginationQuery = {
        page: 1,
        limit: 10,
      };

      const paginateBeach = {
        items: [
          { beachId: 1, name: 'test1' },
          { beachId: 2, name: 'test2' },
          { beachId: 3, name: 'test3' },
          { beachId: 4, name: 'test4' },
          { beachId: 5, name: 'test5' },
        ],
        meta: {
          totalItems: 5,
          itemCount: 5,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
      };

      jest.spyOn(service, 'getAllByBeaches').mockRepository(paginateBeach);

      const result = await service.getAllByBeaches(paginationQuery);
    });
  });

  describe('getBeachById', () => {
    it('should find a beach by Id', async () => {
      const beachId = 1;
      const beach: Beaches = {
        beachId: beachId,
        sidoName: '강릉시',
        gugunName: '',
        beachName: '경포 해수욕장',
        latitude: '3.3',
        longitude: '2.2',
        feedList: [],
        bookmarkList: [],
        likeId: 0,
      };

      jest.spyOn(repository, 'getBeachById').mockResolvedValue(beach);

      const result = await service.getBeachById(beachId);

      expect(result).toEqual(beach);
      expect(repository.getBeachById).toHaveBeenCalledWith(beachId);
    });

    it('should throw NotFoundException if cat is not found', async () => {
      const beacheId = 1;

      jest.spyOn(repository, 'getBeachById').mockResolvedValue(undefined);

      await expect(service.getBeachById(beacheId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
