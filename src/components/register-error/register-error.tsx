import React from 'react';

import { RegisterUserInfo } from '../../interfaces/register-user';
import { fetchUserData, registerSelector } from '../../redux/slices/register-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './register-error.module.scss';

export const RegisterError = () => {
  const dispatch = useAppDispatch();
  const { error, status, requestData } = useAppSelector((state) => registerSelector(state));

  const fetchAgain = async () => {
    await dispatch(fetchUserData(requestData as RegisterUserInfo));
  };

  return (
    <div
      className={status === 'error' && error !== 400 ? styles.reject_active : styles.reject}
      data-test-id='status-block'
    >
      <h3 className={styles.reject_title}>Данные не сохранились</h3>
      <h6 className={styles.reject_wrong}>Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз</h6>
      <button className={styles.reject_again} type='button' onClick={fetchAgain}>
        Повторить
      </button>
    </div>
  );
};
