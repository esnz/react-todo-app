import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { crossColumnReorder, reorderTodos } from '../store/reducers/todoReducer';
import { RootStore } from '../store/store';
import { Todo, TodoStatus } from '../types/Todo';
import Column from './Column';
import styles from './styles/Board.module.scss';

const reorder = (list: Todo[], startIndex: number, endIndex: number): Todo[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source: Todo[], destination: Todo[], droppableSource: any, droppableDestination: any) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);
  return [sourceClone, destClone];
};

interface IBoardProps {
  children?: React.ReactElement<typeof Column>[];
}

const Board: React.FC<IBoardProps> = (props) => {
  const dispatch = useDispatch();
  const { todo, inProgress, completed } = useSelector((store: RootStore) => store.todos);

  const getList = (type: string): { todos: Todo[]; status: TodoStatus } => {
    if (type === 'todo') {
      return { todos: todo, status: TodoStatus.Todo };
    } else if (type === 'inProgress') {
      return { todos: inProgress, status: TodoStatus.InProgress };
    } else {
      return { todos: completed, status: TodoStatus.Completed };
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const { todos, status } = getList(source.droppableId);
      const items = reorder(todos, result.source.index, destination.index);
      dispatch(reorderTodos({ todos: items, type: status }));
    } else {
      const sourceList = getList(source.droppableId);
      const destinationList = getList(destination.droppableId);
      const result = move(sourceList.todos, destinationList.todos, source, destination);

      dispatch(
        crossColumnReorder({
          source: result[0].map((t) => ({ ...t, status: sourceList.status })),
          sourceStatus: sourceList.status,
          destination: result[1].map((t) => ({ ...t, status: destinationList.status })),
          destinationStatus: destinationList.status,
        })
      );
    }
  };

  return (
    <div className={styles.board}>
      <DragDropContext onDragEnd={onDragEnd}>{props.children}</DragDropContext>
    </div>
  );
};

export default Board;
