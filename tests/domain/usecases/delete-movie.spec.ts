import { DeleteMovieByIdUseCase } from '@/domain/usecases';
import { NotFoundError } from '@/domain/errors';
import { movieRepositoryStub } from '@/tests/mocks/infra/respositories';

const makeSut = () => {
  const sut = new DeleteMovieByIdUseCase(movieRepositoryStub);
  return { sut, movieRepositoryStub };
};

const makeInput = (): { id: number } => ({
  id: 1111,
});

describe('DeleteMovieUseCase', () => {
  it('should call MovieRepository with correct values', async () => {
    const { sut, movieRepositoryStub } = makeSut();
    const movieRepositorySpy = jest.spyOn(
      movieRepositoryStub,
      'deleteMovieById',
    );
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
