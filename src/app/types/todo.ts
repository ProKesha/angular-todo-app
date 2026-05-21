export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface TodoRename {
  id: number;
  title: string;
}
