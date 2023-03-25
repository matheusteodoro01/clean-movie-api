import * as z from 'zod';

export const getAllMovieSchema = z.object({
  page: z.preprocess(Number, z.number()).optional(),
});
