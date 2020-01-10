import { MoviesService } from './movies.service';
import { MovieRepository } from './repositories/movies.repository';
import { TagRepository } from '../tags/repository/tags.repository';
import { Test } from '@nestjs/testing';

const mockMovieRepository = () => ({
  saveMovie: jest.fn(),
  getMovieByParam: jest.fn(),
  softDeleteMovie: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
});

const mockMovie = {
  id: 10,
  title: 'Academy Hero 3',
  description: 'New Description',
  poster: 'poster.jpg',
  stock: 3,
  trailer: 'https://trailer.com',
  salePrice: 30,
  rentPrice: 20.76,
  like: 8,
  createdAt: '2020-01-08T19:16:09.179Z',
  updatedAt: '2020-01-10T05:49:26.524Z',
  isActive: false,
  tags: [],
};

const mockTagRepository = () => ({
  getTags: jest.fn(),
  softDelete: jest.fn(),
  getTagByParam: jest.fn(),
  softDeleteTag: jest.fn(),
  saveTag: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

const saveMovieMock = {
  title: 'Ghost Rider',
  description: 'WIP',
  poster: 'https://posters-ghost-rider.com',
  stock: 5,
  trailer: 'https://trailer-ghost-rider.com',
  salePrice: 9.99,
  rentPrice: 5.0,
  tags: [],
};

describe('MovieService', () => {
  let moviesService: MoviesService;
  let movieRepository: MovieRepository;
  let tagRepository: TagRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: MovieRepository, useFactory: mockMovieRepository },
        { provide: TagRepository, useFactory: mockTagRepository },
      ],
    }).compile();

    moviesService = await module.get<MoviesService>(MoviesService);
    movieRepository = await module.get<MovieRepository>(MovieRepository);
    tagRepository = await module.get<TagRepository>(TagRepository);
  });

  it('should be defined', () => {
    expect(moviesService).toBeDefined();
    expect(movieRepository).toBeDefined();
    expect(tagRepository).toBeDefined();
  });

  describe('softdelete movie', () => {
    it('softdelete movie', async () => {
      (movieRepository.getMovieByParam as jest.Mock).mockResolvedValue(mockMovie);
      expect(movieRepository.softDeleteMovie).not.toHaveBeenCalled();
      const result = await moviesService.deleteMovie(10);
      expect(movieRepository.getMovieByParam).not.toHaveBeenCalled();
      expect(movieRepository.softDeleteMovie).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  describe('save movie', () => {
    beforeEach(() => {
      movieRepository.getMovieByParam = jest.fn().mockResolvedValue(false);
    });

    it('save movie', async () => {
      movieRepository.saveMovie = jest.fn().mockResolvedValue(saveMovieMock);
      expect(movieRepository.saveMovie).not.toHaveBeenCalled();
      await moviesService.saveMovie(saveMovieMock);
    });
  });

  describe('get specific movie', () => {
    it('get specific movie', async () => {
      (movieRepository.findOne as jest.Mock).mockResolvedValue(mockMovie);
      expect(movieRepository.findOne).not.toHaveBeenCalled();
      const result = await moviesService.getMovie(10);
      expect(result).toBeDefined();
    });
  });

  describe('update specific movie', () => {
    it('update movie', async () => {
      expect(movieRepository.getMovieByParam).not.toHaveBeenCalled();
      (movieRepository.getMovieByParam as jest.Mock).mockResolvedValue(mockMovie);
      await moviesService.updateMovie(10, saveMovieMock);
      expect(movieRepository.getMovieByParam).toHaveBeenCalled();
      expect(movieRepository.save).toHaveBeenCalled();
    });
  });

  describe('give like to a movie', () => {
    it('give like to a specific movie', async () => {
      expect(movieRepository.getMovieByParam).not.toHaveBeenCalled();
      (movieRepository.getMovieByParam as jest.Mock).mockResolvedValue(mockMovie);
      await moviesService.giveLike(10);
      expect(movieRepository.getMovieByParam).toHaveBeenCalled();
      expect(movieRepository.save).toHaveBeenCalled();
    });
  });
});
