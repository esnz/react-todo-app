import { ReactComponent as TodoIcon } from '../assets/tick_box.svg';
import styles from './styles/Header.module.scss';

const Header = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.appTitle}>
          <TodoIcon />
          <span>React Todo App</span>
        </h2>
      </header>
    </div>
  );
};

export default Header;
