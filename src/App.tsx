import { useSelector } from 'react-redux';
import './App.scss';
import AddTodo from './components/AddTodo';
import Board from './components/Board';
import Column from './components/Column';
import Header from './components/Header';
import { RootStore } from './store/store';

function App() {
  const { todo, inProgress, completed } = useSelector((store: RootStore) => store.todos);

  return (
    <>
      <Header />
      <div className="App">
        <AddTodo />
        <Board>
          <Column title="To Do" type="todo" todos={todo}></Column>
          <Column title="In Progress" type="inProgress" todos={inProgress}></Column>
          <Column title="Completed" type="completed" todos={completed}></Column>
        </Board>
      </div>
    </>
  );
}

export default App;
