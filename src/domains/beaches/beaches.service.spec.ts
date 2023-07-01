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
          {
            beachId: 1,
            sidoName: '강원',
            gugunName: '강릉시',
            beachName: '강문',
            latitude: '37.7966180000',
            longitude: '128.9175910000',
          },
          {
            beachId: 2,
            sidoName: '강원',
            gugunName: '강릉시',
            beachName: '경포',
            latitude: '37.8035140000',
            longitude: '128.9099620000',
          },
          {
            beachId: 3,
            sidoName: '강원',
            gugunName: '강릉시',
            beachName: '사근진',
            latitude: '37.8131140000',
            longitude: '128.8984790000',
          },
          {
            beachId: 4,
            sidoName: '강원',
            gugunName: '강릉시',
            beachName: '사천진',
            latitude: '37.8428370000',
            longitude: '128.8742140000',
          },
          {
            beachId: 5,
            sidoName: '강원',
            gugunName: '강릉시',
            beachName: '송정',
            latitude: '37.7782570000',
            longitude: '128.9403860000',
          },
        ],
        meta: {
          totalItems: 5,
          itemCount: 5,
          itemsPerPage: 5,
          totalPages: 1,
          currentPage: 1,
        },
      };

      jest.spyOn(service, 'getAllByBeaches').mockResolvedValue(paginateBeach);

      const result = await service.getAllByBeaches(paginationQuery);

      expect(result).toEqual(paginateBeach);
      expect(service.getAllByBeaches).toHaveBeenCalledWith(paginationQuery);
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
