import { ListItem } from '@/domain/models';
import { ListRepository } from '@/domain/repositories';

export type CreateListUseCaseInput = {
  name: string;
  description?: string;
  items: Omit<ListItem, 'id'>[];
};

export class CreateListUseCase {
  constructor(private readonly listRepository: ListRepository) {}

  async execute(listData: CreateListUseCaseInput): Promise<void> {
    await this.listRepository.createList(listData);
  }
}
