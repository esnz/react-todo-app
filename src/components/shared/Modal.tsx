import React, { useEffect, useState } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import styles from '../styles/Modal.module.scss';

interface IModalProps {
  visible: boolean;
  closeHandler: Function;
}

const Modal: React.FC<IModalProps> = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => setShow(props.visible), [props.visible]);

  return (
    <div
      className={styles.backdrop}
      onClick={() => {
        props.closeHandler();
      }}
      style={{ display: show ? 'flex' : 'none' }}
      role="dialog"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <a
          className={styles.closeBtn}
          href="/"
          onClick={(e) => {
            e.preventDefault();
            props.closeHandler();
          }}
        >
          <CloseIcon />
        </a>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
