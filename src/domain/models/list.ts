export type List = {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  items: ListItem[];
};

export type ListItem = {
  id: number;
  name: string;
  quantity?: number;
  completed: boolean;
};
