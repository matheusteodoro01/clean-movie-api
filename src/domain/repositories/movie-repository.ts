import { Movie } from '@/domain/models';

export interface MovieRepository {
  createMovie(input: Omit<Movie, 'id'>): Promise<Movie>;
  updateMovie(input: Partial<Movie>): Promise<void>;
  getMovieById({ id }: { id: number }): Promise<Movie | null>;
  list({
    page,
  }: {
    page: number;
  }): Promise<{ page: number; results: Movie[] } | null>;
  deleteMovieById({ id }: { id: number }): Promise<void>;
}
