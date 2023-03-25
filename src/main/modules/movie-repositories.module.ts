import { Module } from '@nestjs/common';
import { infra } from '@/infra/common/ioc';
import { MovieDBMovieRepository } from '@/infra/repositories';

@Module({
  providers: [
    {
      provide: infra.repositories.listRepository,
      useFactory: (baseUrl, movieDbToken) =>
        new MovieDBMovieRepository(baseUrl, movieDbToken),
      inject: [
        infra.environment.movieDbBaseUrl,
        infra.environment.movieDbToken,
      ],
    },
  ],
  exports: [infra.repositories.listRepository],
})
export class MovieRepositoriesModule {}
