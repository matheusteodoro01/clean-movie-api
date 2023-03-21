import { ListRepository } from '@/domain/repositories';
import { List } from '@/domain/models';
import { NotFoundError } from '@/domain/errors';

export class GetListByIdUseCase {
  constructor(private readonly listRepository: ListRepository) {}

  async execute(id: string): Promise<List | null> {
    const list = await this.listRepository.getListById(id);

    if (!list) {
      throw new NotFoundError(`List with ID ${id} not found`);
    }

    return list;
  }
}
