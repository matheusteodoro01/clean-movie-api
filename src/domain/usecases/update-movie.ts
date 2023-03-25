import { MovieRepository } from '@/domain/repositories';
import { Movie } from '@/domain/models';
import { NotFoundError } from '@/domain/errors';

export class UpdateMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(movieData: Partial<Movie> & { id: number }): Promise<void> {
    const existingMovie = await this.movieRepository.getMovieById({
      id: movieData.id,
    });

    if (!existingMovie) {
      throw new NotFoundError(`Filme ID ${movieData.id} não encontrado`);
    }

    const updatedMovie: Movie = {
      ...existingMovie,
      ...movieData,
    };

    await this.movieRepository.updateMovie(updatedMovie);
  }
}
