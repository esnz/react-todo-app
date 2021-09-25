import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoStatus } from '../../types/Todo';
import { TodosState } from '../../types/TodosState';

const persistedTodos = () => {
  try {
    const persistedState = localStorage.getItem('todos');
    if (persistedState) return JSON.parse(persistedState) as TodosState;
  } catch (e) {
    console.log(e);
  }
};

const initialState: TodosState = persistedTodos() || {
  todo: [],
  inProgress: [],
  completed: [],
  editingTodo: null,
};

// Helper function to get respective todo list based on status
const getTodoOriginByStatus = (status: TodoStatus, state: TodosState) => {
  switch (status) {
    case TodoStatus.Todo:
      return state.todo;
    case TodoStatus.InProgress:
      return state.inProgress;
    case TodoStatus.Completed:
      return state.completed;
  }
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state: TodosState, action: PayloadAction<Todo>) => {
      const { status } = action.payload;
      const todo = action.payload;

      switch (status) {
        case TodoStatus.Todo:
          state.todo.push(todo);
          break;
        case TodoStatus.InProgress:
          state.inProgress.push(todo);
          break;
        case TodoStatus.Completed:
          state.completed.push(todo);
          break;
      }
    },

    updateTodo: (state: TodosState, { payload: { todo, prevStatus } }: PayloadAction<{ todo: Todo; prevStatus: TodoStatus }>) => {
      const origin = getTodoOriginByStatus(prevStatus, state);
      const index = origin.findIndex((t) => t.id === todo.id);

      if (index > -1) {
        // Todo status changed
        // We need to remove it from the current array and add it to the respective array
        if (todo.status !== prevStatus) {
          const newOrigin = getTodoOriginByStatus(todo.status, state);
          origin.splice(index, 1);
          newOrigin.push(todo);
        } else {
          origin[index] = todo;
        }
      }

      state.editingTodo = null;
    },

    removeTodo: (state: TodosState, { payload: { id, status } }: PayloadAction<Todo>) => {
      const origin = getTodoOriginByStatus(status, state);
      const todo = origin.find((todo) => todo.id === id);

      todo && origin.splice(state.todo.indexOf(todo), 1);
    },

    setEditingTodo: (state: TodosState, action: PayloadAction<Todo>) => {
      state.editingTodo = action.payload;
    },

    dismissEditingTodo: (state: TodosState) => {
      state.editingTodo = null;
    },

    reorderTodos: (state: TodosState, { payload: { todos, type } }: PayloadAction<{ todos: Todo[]; type: TodoStatus }>) => {
      if (type === TodoStatus.Todo) state.todo = todos;
      if (type === TodoStatus.InProgress) state.inProgress = todos;
      if (type === TodoStatus.Completed) state.completed = todos;
    },

    crossBoardReorder: (
      state: TodosState,
      {
        payload: { source, sourceStatus, destination, destinationStatus },
      }: PayloadAction<{ source: Todo[]; sourceStatus: TodoStatus; destination: Todo[]; destinationStatus: TodoStatus }>
    ) => {
      if (sourceStatus === TodoStatus.Todo) state.todo = source;
      if (sourceStatus === TodoStatus.InProgress) state.inProgress = source;
      if (sourceStatus === TodoStatus.Completed) state.completed = source;

      if (destinationStatus === TodoStatus.Todo) state.todo = destination;
      if (destinationStatus === TodoStatus.InProgress) state.inProgress = destination;
      if (destinationStatus === TodoStatus.Completed) state.completed = destination;
    },
  },
});

export const { addTodo, updateTodo, setEditingTodo, dismissEditingTodo, removeTodo, reorderTodos, crossBoardReorder } = todoSlice.actions;

export default todoSlice.reducer;
