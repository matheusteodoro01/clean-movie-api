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

describe('updateMovie', () => {
  it('should update the movie if it exists', async () => {
    const { sut } = await makeSut();
    const movie = await sut.createMovie(makeMovie);
    const updatedMovie = {
      ...movie,
      overview: 'A different overview',
    };

    await sut.updateMovie(updatedMovie);
    const retrievedMovie = await sut.getMovieById({
      id: updatedMovie.id,
    });

    expect(retrievedMovie).toEqual(updatedMovie);
  });
});
