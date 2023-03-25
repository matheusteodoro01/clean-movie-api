import { Module, Global } from '@nestjs/common';
import { infra } from '@/infra/common/ioc';
import { z } from 'zod';

const envSchema = z.object({
  MOVIE_DB_API_BASE_URL: z.string(),
  MOVIE_DB_TOKEN: z.string(),
});

@Global()
@Module({})
export class EnvironmentModule {
  static forRoot() {
    const { MOVIE_DB_API_BASE_URL, MOVIE_DB_TOKEN } = envSchema.parse(
      process.env,
    );

    return {
      module: EnvironmentModule,
      providers: [
        {
          provide: infra.environment.movieDbBaseUrl,
          useValue: MOVIE_DB_API_BASE_URL,
        },
        {
          provide: infra.environment.movieDbToken,
          useValue: MOVIE_DB_TOKEN,
        },
      ],
      exports: [
        infra.environment.movieDbToken,
        infra.environment.movieDbBaseUrl,
      ],
    };
  }
}
