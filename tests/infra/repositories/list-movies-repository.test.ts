import { infra } from '@/infra/common';
import { MovieDBMovieRepository } from '@/infra/repositories';
import { MovieRepositoriesModule } from '@/main/modules/movie-repositories.module';
import { createEndToEndApp } from '@/tests/create-end-to-end-app';
import { mockAxios } from '@/tests/mocks';

const makeSut = async () => {
  const { app } = await createEndToEndApp();
  const sut = app
    .select(MovieRepositoriesModule)
    .get<MovieDBMovieRepository>(infra.repositories.listRepository);
  return { sut };
};

describe('list', () => {
  it('should return list of movies for a given page', async () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          title: 'Movie 1',
          overview: 'Overview 1',
          vote_average: 8.5,
          poster_path: '/movie1.jpg',
          release_date: '2022-03-01',
        },
        {
          id: 2,
          title: 'Movie 2',
          overview: 'Overview 2',
          vote_average: 7.5,
          poster_path: '/movie2.jpg',
          release_date: '2022-03-02',
        },
      ],
    };
    mockAxios(mockResponse);
    const { sut } = await makeSut();
    const page = 1;
    const response = await sut.list({ page: 1 });

    expect(response).toEqual({
      page,
      results: mockResponse.results.map((movie) => movie),
    });
  });

  it('should return list of movies for a given page without movie deleted', async () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          title: 'Movie 1',
          overview: 'Overview 1',
          vote_average: 8.5,
          poster_path: '/movie1.jpg',
          release_date: '2022-03-01',
        },
        {
          id: 2,
          title: 'Movie 2',
          overview: 'Overview 2',
          vote_average: 7.5,
          poster_path: '/movie2.jpg',
          release_date: '2022-03-02',
        },
      ],
    };
    mockAxios(mockResponse);
    const page = 1;
    const { sut } = await makeSut();
    await sut.deleteMovieById({ id: 2 });
    const response = await sut.list({ page: 1 });

    expect(response).toEqual({
      page,
      results: mockResponse?.results
        ?.filter(({ id }) => id !== 2)
        ?.map((movie) => movie),
    });
  });

  it('should throw an error when API returns an error', async () => {
    mockAxios({}, 500);
    const page = 1;

    const { sut } = await makeSut();
    await expect(sut.list({ page })).rejects.toThrow('Falha ao buscar filmes');
  });
});
