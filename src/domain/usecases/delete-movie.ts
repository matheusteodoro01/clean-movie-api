import { MovieRepository } from '@/domain/repositories';
import { NotFoundError } from '@/domain/errors';

export class DeleteMovieByIdUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute({ id }: { id: number }): Promise<void> {
    const movie = await this.movieRepository.getMovieById({ id });

    if (!movie) {
      throw new NotFoundError(`Filme ID ${id} não encontrado`);
    }

    await this.movieRepository.deleteMovieById({ id });
  }
}
