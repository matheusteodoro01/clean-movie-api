import { Movie } from '@/domain/models';
import { MovieRepository } from '@/domain/repositories';

export class CreateMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(movieData: Omit<Movie, 'id'>): Promise<Movie> {
    return await this.movieRepository.createMovie(movieData);
  }
}
