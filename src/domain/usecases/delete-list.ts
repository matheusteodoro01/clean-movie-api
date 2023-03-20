import { ListRepository } from '@/domain/repositories';

export class DeleteListByIdUseCase {
  constructor(private readonly listRepository: ListRepository) {}

  async execute(id: number): Promise<void> {
    const list = await this.listRepository.getListById(id);

    if (!list) {
      throw new Error(`List with ID ${id} not found`);
    }

    await this.listRepository.deleteListById(id);
  }
}
