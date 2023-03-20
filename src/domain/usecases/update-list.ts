import { ListRepository } from '@/domain/repositories';
import { List } from '@/domain/models';

export class UpdateListUseCase {
  constructor(private readonly listRepository: ListRepository) {}

  async execute(listData: List): Promise<void> {
    const existingList = await this.listRepository.getListById(listData.id);

    if (!existingList) {
      throw new Error(`List with ID ${listData.id} not found`);
    }

    const updatedList: List = {
      ...existingList,
      ...listData,
    };

    await this.listRepository.updateList(updatedList);
  }
}
