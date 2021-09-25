import { CSSProperties, forwardRef } from 'react';
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { ReactComponent as EditIcon } from '../assets/edit.svg';
import { ReactComponent as RemoveIcon } from '../assets/remove.svg';
import { removeTodo, setEditingTodo } from '../store/reducers/todoReducer';
import { Todo, TodoStatus } from '../types/Todo';
import styles from './styles/TodoItem.module.scss';

interface ITodoItemProps {
  todo: Todo;
  ref: any;
  style: CSSProperties | undefined;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
  draggableProps: DraggableProvidedDraggableProps;
}

const TodoItem = forwardRef<HTMLDivElement, ITodoItemProps>((props, ref) => {
  const dispatch = useDispatch();

  const getTodoStatusStyle = () => {
    const { status } = props.todo;

    if (status === TodoStatus.Todo) {
      return styles.todo;
    } else if (status === TodoStatus.InProgress) {
      return styles.inProgress;
    } else {
      return styles.completed;
    }
  };

  return (
    <div
      className={[styles.todoItem, getTodoStatusStyle()].join(' ')}
      {...props.draggableProps}
      {...props.dragHandleProps}
      style={props.style}
      ref={ref}
    >
      <p>{props.todo.title}</p>
      <div className={styles.actions}>
        <button
          className={[styles.actionButton, styles.edit].join(' ')}
          onClick={() => {
            dispatch(setEditingTodo(props.todo));
          }}
        >
          <EditIcon />
        </button>
        <button
          className={[styles.actionButton, styles.remove].join(' ')}
          onClick={() => {
            dispatch(removeTodo(props.todo));
          }}
        >
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
});

export default TodoItem;
