import { List, ListItem } from '@/domain/models';

export type CreateListInput = {
  name: string;
  description?: string;
  items: Omit<ListItem, 'id'>[];
};

export interface ListRepository {
  createList(list: CreateListInput): Promise<void>;
  updateList(list: List): Promise<void>;
  getListById(id: string): Promise<List | null>;
  list(): Promise<List[] | null>;
  deleteListById(id: string): Promise<void>;
}
