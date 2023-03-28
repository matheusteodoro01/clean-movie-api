import * as z from 'zod';

export const deleteMovieSchema = z.object({
  id: z.preprocess(Number, z.number()),
});
