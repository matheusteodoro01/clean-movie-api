import { infra } from '@/infra/common';
import { MovieDBMovieRepository } from '@/infra/repositories';
import { MovieRepositoriesModule } from '@/main/modules/movie-repositories.module';
import { createEndToEndApp } from '@/tests/create-end-to-end-app';
import { mockAxios, makeMovie } from '@/tests/mocks';

const makeSut = async () => {
  const { app } = await createEndToEndApp();
  const sut = app
    .select(MovieRepositoriesModule)
    .get<MovieDBMovieRepository>(infra.repositories.listRepository);
  return { sut };
};

describe('getMovieById', () => {
  it('should return null for a non-existent movie', async () => {
    mockAxios(null);
    const { sut } = await makeSut();
    const nonExistentMovieId = 999999;
    const movie = await sut.getMovieById({ id: nonExistentMovieId });
    expect(movie).toBeNull();
  });

  it('should return null for a non-existent movie in api ', async () => {
    mockAxios(null, 404);
    const { sut } = await makeSut();
    const nonExistentMovieId = 999999;
    const movie = await sut.getMovieById({ id: nonExistentMovieId });
    expect(movie).toBeNull();
  });

  it('should return a movie for an existing id', async () => {
    mockAxios(makeMovie);
    const { sut } = await makeSut();
    const existingMovieId = 1111;
    const movie = await sut.getMovieById({ id: existingMovieId });
    expect(movie?.id).toEqual(existingMovieId);
  });

  it('should throw an error for an invalid id', async () => {
    mockAxios(null, 500);
    const { sut } = await makeSut();
    const invalidMovieId = 0;
    await expect(sut.getMovieById({ id: invalidMovieId })).rejects.toThrow(
      'Falha ao buscar filme ID',
    );
  });
});
