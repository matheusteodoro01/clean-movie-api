import axios, { AxiosInstance } from 'axios';
import { Movie } from '@/domain/models';
import { MovieRepository } from '@/domain/repositories';

export class MovieDBMovieRepository implements MovieRepository {
  private readonly httpClient: AxiosInstance;
  private pages: { [key: string]: Movie[] } = {};
  private deletedMovies: number[] = [];
  private responseLanguage = 'pt-BR';
  private limit = 10;

  constructor(
    private readonly baseUrl: string,
    private readonly movieDbToken: string,
  ) {
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 5000,
    });
  }

  async createMovie(input: Omit<Movie, 'id'>): Promise<Movie> {
    const newMovie = { ...input, id: Date.now() };
    const defaultPage = 1;
    this.addMovieOnPage(defaultPage, newMovie);
    return newMovie;
  }

  async updateMovie(input: Movie): Promise<void> {
    const movieIds = Object.keys(this.pages);

    for (let i = 0; i < movieIds.length; i++) {
      const movies = this.pages[movieIds[i]];
      const movieIndex = movies.findIndex((movie) => movie.id === input.id);
      if (movieIndex >= 0) {
        this.pages[movieIds[i]][movieIndex] = input;
        break;
      }
    }
  }

  async getMovieById({ id }: { id: number }): Promise<Movie | null> {
    try {
      if (this.deletedMovies.find((movieDeletedId) => movieDeletedId === id)) {
        return null;
      }

      for (const pageMovies of Object.values(this.pages)) {
        const movie = pageMovies.find((movie) => movie.id === id);
        if (movie) {
          return movie;
        }
      }
      const { data } = await this.httpClient.get<Movie>(
        `/movie/${id}?api_key=${this.movieDbToken}&language=${this.responseLanguage}`,
      );

      return data;
    } catch (error: any) {
      if (error?.response.status === 404) {
        return null;
      }
      throw new Error(`Falha ao buscar filme ID ${id}`);
    }
  }

  async list({
    page,
  }: {
    page: number;
  }): Promise<{ page: number; results: Movie[] } | null> {
    !this.pages[page] && (this.pages[page] = []);

    try {
      const { data } = await this.httpClient.get<{ results: Movie[] }>(
        `/movie/popular?api_key=${this.movieDbToken}&language=${this.responseLanguage}&page=${page}`,
      );

      data.results.forEach((movie) => {
        if (
          !this.pages[page].find((moviePage) => moviePage.id === movie.id) &&
          !this.deletedMovies.find((id) => id === movie.id)
        ) {
          this.addMovieOnPage(page, movie);
        }
      });

      return { page, results: this.pages[page] };
    } catch (error: any) {
      throw new Error('Falha ao buscar filmes');
    }
  }

  async deleteMovieById({ id }: { id: number }): Promise<void> {
    for (const pageMovies of Object.values(this.pages)) {
      const movieIndex = pageMovies.findIndex((movie) => movie.id === id);

      if (movieIndex >= 0) {
        pageMovies.splice(movieIndex, 1);
        break;
      }
    }
    this.deletedMovies.push(id);
    return Promise.resolve();
  }

  private addMovieOnPage(page: number, movie: Movie): void {
    !this.pages[page] && (this.pages[page] = []);

    if (this.pages[page].length < this.limit) {
      this.pages[page].push(movie);
    } else {
      this.addMovieOnPage(page + 1, movie);
    }
  }
}
