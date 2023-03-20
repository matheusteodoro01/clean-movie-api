import { ListRepository } from '@/domain/repositories';
import { List } from '@/domain/models';

export class GetListByIdUseCase {
  constructor(private readonly listRepository: ListRepository) {}

  async execute(id: number): Promise<List | null> {
    const list = await this.listRepository.getListById(id);

    if (!list) {
      throw new Error(`List with ID ${id} not found`);
    }

    return list;
  }
}
