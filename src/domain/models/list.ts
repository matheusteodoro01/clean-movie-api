export type List = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  items: ListItem[];
};

export type ListItem = {
  id: string;
  name: string;
  quantity?: number;
  completed: boolean;
};
