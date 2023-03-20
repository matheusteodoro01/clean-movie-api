import { List } from '@/domain/models';
import { ListRepository } from '@/domain/repositories';

export class CreateListUseCase {
  constructor(private readonly listRepository: ListRepository) {}

  async execute(
    listData: Omit<List, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<void> {
    await this.listRepository.createList(listData);
  }
}
