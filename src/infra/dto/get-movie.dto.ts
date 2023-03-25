import * as z from 'zod';

export const getMovieSchema = z.object({
  id: z.number(),
});
