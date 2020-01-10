import { Test } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { TagRepository } from './repository/tags.repository';
import { NotFoundException } from '@nestjs/common';

const mockTagRepository = () => ({
  getTags: jest.fn(),
  softDelete: jest.fn(),
  getTagByParam: jest.fn(),
  softDeleteTag: jest.fn(),
  saveTag: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

const mockTag = {
  id: 9,
  name: 'Comedy',
  isActive: false,
  createdAt: '2020-01-09T04:30:35.705Z',
  updatedAt: '2020-01-09T04:32:35.380Z',
};

const saveTagMock = {
  name: 'Action',
};

describe('TagService', () => {
  let tagsRepository: TagRepository;
  let tagsService: TagsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TagsService, { provide: TagRepository, useFactory: mockTagRepository }],
    }).compile();

    tagsService = await module.get<TagsService>(TagsService);
    tagsRepository = await module.get<TagRepository>(TagRepository);
  });

  it('should be defined', () => {
    expect(tagsService).toBeDefined();
    expect(tagsRepository).toBeDefined();
  });

  describe('softDelete Tags', () => {
    it('softdelete tags', async () => {
      (tagsRepository.getTagByParam as jest.Mock).mockResolvedValue(mockTag);
      expect(tagsRepository.softDeleteTag).not.toHaveBeenCalled();
      const result = await tagsService.softDeleteTag(9);
      expect(tagsRepository.softDeleteTag).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  describe('get specific tag', () => {
    it('get specific tag', async () => {
      (tagsRepository.getTagByParam as jest.Mock).mockResolvedValue(mockTag);
      expect(tagsRepository.getTagByParam).not.toHaveBeenCalled();
      const result = await tagsService.getTag(9);
      expect(tagsRepository.getTagByParam).toHaveBeenCalled();
      expect(result).toBeDefined();
    });
    it('throw error because of invalid tag id', async () => {
      (tagsRepository.getTagByParam as jest.Mock).mockResolvedValue(null);
      expect(tagsService.getTag(2)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('save tag', () => {
    it('save tag', async () => {
      expect(tagsRepository.saveTag).not.toHaveBeenCalled();
      await tagsService.saveTag(saveTagMock);
      expect(tagsRepository.saveTag).toHaveBeenCalled();
      expect(tagsRepository.getTagByParam).not.toHaveBeenCalled();
      expect(tagsRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('update tag', () => {
    it('update tag name', async () => {
      (tagsRepository.getTagByParam as jest.Mock).mockResolvedValue(mockTag);
      expect(tagsRepository.getTagByParam).not.toHaveBeenCalled();
      expect(tagsRepository.save).not.toHaveBeenCalled();
      await tagsService.updateTag(9, 'newTag');
      expect(tagsRepository.getTagByParam).toHaveBeenCalled();
      expect(tagsRepository.save).toHaveBeenCalled();
    });
    it('throw error because of invalid tag id', async () => {
      (tagsRepository.getTagByParam as jest.Mock).mockResolvedValue(null);
      expect(tagsService.updateTag(2, 'newTag')).rejects.toThrowError(NotFoundException);
    });
  });
});
