import { List } from '@/domain/models';
import { ListRepository } from '@/domain/repositories';

export class ListAllUseCase {
  constructor(private readonly listRepository: ListRepository) {}

  async execute(): Promise<List[]> {
    const lists = await this.listRepository.list();
    return lists;
  }
}
