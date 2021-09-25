export type Todo = {
  id: string;
  title: string;
  status: TodoStatus;
};

export enum TodoStatus {
  Todo = 'Todo',
  InProgress = 'InProgress',
  Completed = 'Completed',
}
