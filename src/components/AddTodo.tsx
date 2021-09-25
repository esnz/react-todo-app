import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addTodo, dismissEditingTodo, updateTodo } from '../store/reducers/todoReducer';
import { RootStore } from '../store/store';
import { TodoStatus } from '../types/Todo';
import Modal from './shared/Modal';
import styles from './styles/AddTodo.module.scss';

const AddTodo: React.FC = () => {
  const dispatch = useDispatch();
  const { todo, inProgress, completed, editingTodo } = useSelector((store: RootStore) => store.todos);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoStatus, setTodoStatus] = useState<TodoStatus>(TodoStatus.Todo);

  useEffect(() => {
    if (editingTodo) {
      setIsModalOpen(true);
      setTodoTitle(editingTodo.title);
      setTodoStatus(editingTodo.status);
    }
  }, [editingTodo]);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todo = {
      id: editingTodo ? editingTodo.id : uuidv4(),
      title: todoTitle,
      status: todoStatus,
    };
    dispatch(editingTodo ? updateTodo({ todo, prevStatus: editingTodo.status }) : addTodo(todo));

    setIsModalOpen(false);
    setTodoTitle('');
  };

  const cancelEditing = () => {
    setIsModalOpen(false);
    setTodoTitle('');
    setTodoStatus(TodoStatus.Todo);
    setTimeout(() => dispatch(dismissEditingTodo()), 100);
  };

  const totalTasks = todo.length + inProgress.length + completed.length;

  return (
    <>
      <Modal show={isModalOpen} closeHandler={() => cancelEditing()}>
        <form
          className={styles.addTodoForm}
          onSubmit={(e) => {
            handleAddTodo(e);
          }}
        >
          <h4>{editingTodo ? 'Edit Todo' : 'Add New Todo'}</h4>
          <label htmlFor="todoTitle">Title</label>
          <input
            name="todoTitle"
            className={styles.textInput}
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            type="text"
            required
          />

          <label htmlFor="todoStatus">Status</label>
          <select
            name="todoStatus"
            value={todoStatus}
            onChange={(e) => {
              setTodoStatus(e.target.value as TodoStatus);
            }}
          >
            <option value={TodoStatus.Todo}>Todo</option>
            <option value={TodoStatus.InProgress}>In Progress</option>
            <option value={TodoStatus.Completed}>Completed</option>
          </select>

          <div>
            <button className={[styles.button, styles.success].join(' ')} type="submit">
              {editingTodo ? 'Update Todo' : 'Save Todo'}
            </button>
            <button
              onClick={() => {
                cancelEditing();
              }}
              type="button"
              className={[styles.button, styles.danger].join(' ')}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <div className={styles.addTodo}>
        <button type="submit" onClick={() => setIsModalOpen(true)} className={[styles.button, styles.primary].join(' ')}>
          New Todo
        </button>
        <p>
          {totalTasks} task{totalTasks > 1 ? 's' : ''} ({completed.length} completed)
        </p>
      </div>
    </>
  );
};
export default AddTodo;
