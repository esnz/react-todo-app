import { Todo } from './Todo';

export type TodosState = {
  todo: Todo[];
  inProgress: Todo[];
  completed: Todo[];
  editingTodo: Todo | null;
};
