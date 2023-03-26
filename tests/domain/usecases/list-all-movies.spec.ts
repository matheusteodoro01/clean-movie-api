import { ListAllMoviesUseCase } from '@/domain/usecases';
import { movieRepositoryStub } from '@/tests/mocks/infra/respositories';
import { makeMovie } from '@/tests/mocks/movie';

const makeSut = () => {
  const sut = new ListAllMoviesUseCase(movieRepositoryStub);
  return { sut, movieRepositoryStub };
};

describe('ListAllMoviesUseCase', () => {
  it('should call MovieRepository with correct values', async () => {
    const { sut, movieRepositoryStub } = makeSut();
    const movieRepositorySpy = jest.spyOn(movieRepositoryStub, 'list');
    await sut.execute();
    expect(movieRepositorySpy).toHaveBeenCalledTimes(1);
  });

  it('should returns a valid movies', async () => {
    const { sut } = makeSut();
    const result = await sut.execute();
    expect(result).toEqual({ page: 1, results: [makeMovie] });
  });
});
