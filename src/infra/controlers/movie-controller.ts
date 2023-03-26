import {
  CreateMovieUseCase,
  DeleteMovieByIdUseCase,
  GetMovieByIdUseCase,
  ListAllMoviesUseCase,
  UpdateMovieUseCase,
} from '@/domain/usecases';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Put,
  Query,
} from '@nestjs/common';
import {
  createMovieSchema,
  deleteMovieSchema,
  getAllMovieSchema,
  getMovieSchema,
  updateMovieSchema,
} from '@/infra/dto';
import { domain } from '@/domain/common/ioc';
@Controller('movie')
export class MovieController {
  constructor(
    @Inject(domain.usecases.createMovie)
    private readonly creteMovieUseCase: CreateMovieUseCase,
    @Inject(domain.usecases.getMovie)
    private readonly getMovieUseCase: GetMovieByIdUseCase,
    @Inject(domain.usecases.listAll)
    private readonly listAllUseCase: ListAllMoviesUseCase,
    @Inject(domain.usecases.updateMovie)
    private readonly updateMovieUseCase: UpdateMovieUseCase,
    @Inject(domain.usecases.deleteMovie)
    private readonly deleteMovieUseCase: DeleteMovieByIdUseCase,
  ) {}

  @Post()
  async create(@Body() data: any) {
    return await this.creteMovieUseCase.execute(createMovieSchema.parse(data));
  }

  @Get()
  async findAll(@Query() query: { page: string }) {
    return await this.listAllUseCase.execute(
      getAllMovieSchema.parse(query).page,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.getMovieUseCase.execute(
      getMovieSchema.parse({ id: Number(id) }),
    );
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return await this.updateMovieUseCase.execute(
      updateMovieSchema.parse({ ...data, id: Number(id) }),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id);
    return this.deleteMovieUseCase.execute(
      deleteMovieSchema.parse({ id: Number(id) }),
    );
  }
}
