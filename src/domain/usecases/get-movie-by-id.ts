import { MovieRepository } from '@/domain/repositories';
import { Movie } from '@/domain/models';
import { NotFoundError } from '@/domain/errors';

export class GetMovieByIdUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute({ id }: { id: number }): Promise<Movie | null> {
    const movie = await this.movieRepository.getMovieById({ id });

    if (!movie) {
      throw new NotFoundError(`Filme ID ${id} não encontrado`);
    }

    return movie;
  }
}
