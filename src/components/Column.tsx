import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Todo } from '../types/Todo';
import styles from './styles/Column.module.scss';
import TodoItem from './TodoItem';

interface IColumnProps {
  title: string;
  todos: Todo[];
  type: 'todo' | 'inProgress' | 'completed';
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  ...draggableStyle,
});

const Column: React.FC<IColumnProps> = ({ todos, title, type }) => {
  return (
    <div className={styles.column}>
      <h6 className={[styles.title, styles[type]].join(' ')}>{title}</h6>
      <div className={styles.todoContainer}>
        <Droppable droppableId={type}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <TodoItem
                      key={item.id}
                      todo={item}
                      ref={provided.innerRef}
                      dragHandleProps={provided.dragHandleProps}
                      draggableProps={provided.draggableProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    ></TodoItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
