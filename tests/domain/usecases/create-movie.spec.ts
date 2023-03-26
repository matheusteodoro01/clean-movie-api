import { CreateMovieUseCase } from '@/domain/usecases';
import { makeMovie } from '@/tests/mocks/movie';
import { Movie } from '@/domain/models';
import { movieRepositoryStub } from '@/tests/mocks/infra/respositories';

const makeSut = () => {
  const sut = new CreateMovieUseCase(movieRepositoryStub);
  return { sut, movieRepositoryStub };
};

const makeInput = (): Omit<Movie, 'id'> => ({
  budget: 0,
  adult: false,
  genres: [],
  homepage: 'valid_homepage',
  original_language: 'valid_original_language',
  original_title: 'valid_original_language',
  overview: 'valid_overview',
  popularity: 0,
  poster_path: 'valid_poster_path',
  production_companies: [],
  production_countries: [],
  release_date: 'valid_release_date',
  revenue: 0,
  runtime: 0,
  spoken_languages: [],
  status: 'valid_status',
  title: 'valid_title',
});

describe('CreateMovieUseCase', () => {
  it('should call MovieRepository with correct values', async () => {
    const { sut, movieRepositoryStub } = makeSut();
    const movieRepositorySpy = jest.spyOn(movieRepositoryStub, 'createMovie');
    await sut.execute(makeInput());
    expect(movieRepositorySpy).toHaveBeenCalledWith(makeInput());
  });

  it('should returns a valid movies', async () => {
    const { sut } = makeSut();
    const result = await sut.execute(makeInput());
    expect(result).toEqual(makeMovie);
  });
});
