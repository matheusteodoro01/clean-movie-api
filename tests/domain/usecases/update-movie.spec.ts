import { UpdateMovieUseCase } from '@/domain/usecases';
import { Movie } from '@/domain/models';
import { NotFoundError } from '@/domain/errors';
import { movieRepositoryStub } from '@/tests/mocks/infra/respositories';

const makeSut = () => {
  const sut = new UpdateMovieUseCase(movieRepositoryStub);
  return { sut, movieRepositoryStub };
};

const makeInput = (): Movie => ({
  budget: 0,
  id: 111,
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

describe('UpdateMovieUseCase', () => {
  it('should call MovieRepository with correct values', async () => {
    const { sut, movieRepositoryStub } = makeSut();
    const movieRepositorySpy = jest.spyOn(movieRepositoryStub, 'updateMovie');
    await sut.execute(makeInput());
    expect(movieRepositorySpy).toHaveBeenCalledWith(makeInput());
  });

  it('should throws if MovieRepository returns null', async () => {
    const { sut, movieRepositoryStub } = makeSut();
    jest.spyOn(movieRepositoryStub, 'getMovieById').mockResolvedValueOnce(null);
    const promise = sut.execute(makeInput());
    await expect(promise).rejects.toThrowError(
      new NotFoundError(`Filme ID ${makeInput().id} não encontrado`),
    );
  });
});
