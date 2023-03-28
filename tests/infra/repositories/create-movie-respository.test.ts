import { createEndToEndApp } from '@/tests/create-end-to-end-app';
import { MovieRepositoriesModule } from '@/main/modules/movie-repositories.module';
import { infra } from '@/infra/common';
import { makeMovie, mockAxios } from '@/tests/mocks';
import { MovieDBMovieRepository } from '@/infra/repositories';
import { Movie } from '@/domain/models';

const makeSut = async () => {
  const { app } = await createEndToEndApp();
  const sut = app
    .select(MovieRepositoriesModule)
    .get<MovieDBMovieRepository>(infra.repositories.listRepository);
  return { sut };
};

describe('createMovie', () => {
  beforeEach(async () => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  it('should create a new movie', async () => {
    const { sut } = await makeSut();
    const newMovie = Object.assign({}, makeMovie, { id: undefined });
    const result = await sut.createMovie(newMovie);
    expect(result).toEqual({ ...makeMovie, id: Date.now() });
  });

  it('should create a new movie in page 2', async () => {
    const mock: Movie[] = [];
    for (let i = 0; i < 10; i++) mock.push({ ...makeMovie, id: Math.random() });
    mockAxios({ results: mock });
    const { sut } = await makeSut();
    const newMovie = Object.assign({}, makeMovie, { id: undefined });
    await sut.list({ page: 1 });
    await sut.createMovie(newMovie);

    const response = await sut.list({ page: 2 });
    expect(response).toEqual({
      page: 2,
      results: expect.any(Array),
    });
  });
});
