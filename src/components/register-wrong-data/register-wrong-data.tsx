import React from 'react';

import { changeStatus, registerSelector } from '../../redux/slices/register-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './register-wrong-data.module.scss';

export const RegisterWrongData = () => {
  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector((state) => registerSelector(state));

  return (
    <div
      className={status === 'error' && error === 400 ? styles.reject_active : styles.reject}
      data-test-id='status-block'
    >
      <h3 className={styles.reject_title}>Данные не сохранились</h3>
      <h6 className={styles.reject_wrong}>
        Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail
      </h6>
      <button className={styles.reject_again} type='button' onClick={() => dispatch(changeStatus())}>
        Назад к регистрации
      </button>
    </div>
  );
};
