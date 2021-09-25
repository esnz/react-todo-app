import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './reducers/todoReducer';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

store.subscribe(() => {
  const { todo, inProgress, completed } = store.getState().todos;
  localStorage.setItem(
    'todos',
    JSON.stringify({
      todo,
      inProgress,
      completed,
    })
  );
});

export type RootStore = ReturnType<typeof store.getState>;

export default store;
