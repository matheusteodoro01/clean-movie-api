import { infra } from '@/infra/common';
import { MovieDBMovieRepository } from '@/infra/repositories';
import { MovieRepositoriesModule } from '@/main/modules/movie-repositories.module';
import { createEndToEndApp } from '@/tests/create-end-to-end-app';
import { makeMovie } from '@/tests/mocks';

const makeSut = async () => {
  const { app } = await createEndToEndApp();
  const sut = app
    .select(MovieRepositoriesModule)
    .get<MovieDBMovieRepository>(infra.repositories.listRepository);
  return { sut };
};

describe('deleteMovieById', () => {
  it('should delete the movie if it exists', async () => {
    const { sut } = await makeSut();
    const movie = await sut.createMovie(makeMovie);
    await sut.deleteMovieById({ id: movie.id });
    const retrievedMovie = await sut.getMovieById({
      id: movie.id,
    });
    expect(retrievedMovie).toBeNull();
  });

  it('should not delete the movie if it does not exist', async () => {
    const { sut } = await makeSut();
    const id = 12345;
    await sut.deleteMovieById({ id });
    const retrievedMovie = await sut.getMovieById({ id });
    expect(retrievedMovie).toBeNull();
  });
});
