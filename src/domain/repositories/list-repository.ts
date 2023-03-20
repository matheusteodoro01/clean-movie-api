import { List } from '@/domain/models';

export interface ListRepository {
  createList(list: Omit<List, 'id' | 'createdAt' | 'updatedAt'>): Promise<void>;
  updateList(list: List): Promise<void>;
  getListById(id: number): Promise<List | null>;
  list(): Promise<List[] | null>;
  deleteListById(id: number): Promise<void>;
}
