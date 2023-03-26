import { MovieRepository } from '@/domain/repositories';
import { mock } from 'jest-mock-extended';
import { makeMovie } from '@/tests/mocks/movie';

export const movieRepositoryStub = mock<MovieRepository>({
  createMovie: () => Promise.resolve(makeMovie),
  updateMovie: () => Promise.resolve(),
  getMovieById: () => Promise.resolve(makeMovie),
  list: () => Promise.resolve({ page: 1, results: [makeMovie] }),
  deleteMovieById: () => Promise.resolve(),
});
