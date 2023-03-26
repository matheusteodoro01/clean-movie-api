import { Movie } from '@/domain/models';
import { MovieRepository } from '@/domain/repositories';

export class ListAllMoviesUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(
    page?: number,
  ): Promise<{ page: number; results: Movie[] } | null> {
    const movies = await this.movieRepository.list({ page: page ?? 1 });
    return movies;
  }
}
