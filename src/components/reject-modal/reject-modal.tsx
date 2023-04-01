import React from 'react';

import close from '../../assets/img/close_modal.svg';
import warning from '../../assets/img/warning.svg';

import styles from './reject-modal.module.scss';

interface ModalProps {
  closeModal: () => void;
}

export const RejectModal: React.FC<ModalProps> = ({ closeModal }) => (
  <div className={styles.reject}>
    <div className={styles.reject_logoNtext}>
      <img src={warning} alt='' />
      <h5>Что-то пошло не так. Обновите страницу через некоторое время.</h5>
    </div>
    <button className={styles.reject_close} type='button' onClick={closeModal}>
      <img src={close} alt='' />
    </button>
  </div>
);
