import * as z from 'zod';

export const createMovieSchema = z.object({
  adult: z.boolean(),
  budget: z.number().optional(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  homepage: z.string(),
  imdb_id: z.string().optional(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  production_companies: z.array(
    z.object({
      id: z.number(),
      logo_path: z.string().nullable(),
      name: z.string(),
      origin_country: z.string(),
    }),
  ),
  production_countries: z.array(
    z.object({
      iso_3166_1: z.string(),
      name: z.string(),
    }),
  ),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(
    z.object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    }),
  ),
  status: z.string(),
  title: z.string(),
  video: z.boolean().optional(),
  vote_average: z.number().optional(),
  vote_count: z.number().optional(),
});
