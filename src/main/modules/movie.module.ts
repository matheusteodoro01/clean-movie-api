import { domain } from '@/domain/common/ioc';
import {
  CreateMovieUseCase,
  DeleteMovieByIdUseCase,
  GetMovieByIdUseCase,
  MovieAllUseCase,
  UpdateMovieUseCase,
} from '@/domain/usecases';
import { infra } from '@/infra/common/ioc';
import { MovieController } from '@/infra/controlers';
import { Module } from '@nestjs/common';
import { EnvironmentModule } from './environment.module';
import { MovieRepositoriesModule } from './movie-repositories.module';

@Module({
  imports: [EnvironmentModule.forRoot(), MovieRepositoriesModule],
  providers: [
    {
      provide: domain.usecases.createMovie,
      useFactory: (listRepository) => new CreateMovieUseCase(listRepository),
      inject: [infra.repositories.listRepository],
    },
    {
      provide: domain.usecases.getMovie,
      useFactory: (listRepository) => new GetMovieByIdUseCase(listRepository),
      inject: [infra.repositories.listRepository],
    },
    {
      provide: domain.usecases.listAll,
      useFactory: (listRepository) => new MovieAllUseCase(listRepository),
      inject: [infra.repositories.listRepository],
    },
    {
      provide: domain.usecases.updateMovie,
      useFactory: (listRepository) => new UpdateMovieUseCase(listRepository),
      inject: [infra.repositories.listRepository],
    },
    {
      provide: domain.usecases.deleteMovie,
      useFactory: (listRepository) =>
        new DeleteMovieByIdUseCase(listRepository),
      inject: [infra.repositories.listRepository],
    },
  ],
  controllers: [MovieController],
})
export class MovieModule {}
