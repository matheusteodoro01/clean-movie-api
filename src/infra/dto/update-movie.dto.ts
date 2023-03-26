import * as z from 'zod';

export const updateMovieSchema = z.object({
  id: z.number(),
  adult: z.boolean().optional(),
  budget: z.number().optional(),
  genres: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .optional(),
  homepage: z.string().optional(),
  imdb_id: z.string().optional(),
  original_language: z.string().optional(),
  original_title: z.string().optional(),
  overview: z.string().optional(),
  popularity: z.number().optional(),
  poster_path: z.string().optional(),
  production_companies: z
    .array(
      z.object({
        id: z.number(),
        logo_path: z.string().nullable(),
        name: z.string(),
        origin_country: z.string(),
      }),
    )
    .optional(),
  production_countries: z
    .array(
      z.object({
        iso_3166_1: z.string(),
        name: z.string(),
      }),
    )
    .optional(),
  release_date: z.string().optional(),
  revenue: z.number().optional(),
  runtime: z.number().optional(),
  spoken_languages: z
    .array(
      z.object({
        english_name: z.string(),
        iso_639_1: z.string(),
        name: z.string(),
      }),
    )
    .optional(),
  status: z.string().optional(),
  title: z.string().optional(),
  video: z.boolean().optional(),
  vote_average: z.number().optional(),
  vote_count: z.number().optional(),
});
