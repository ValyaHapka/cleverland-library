import React from 'react';

import { UserInfo } from '../../interfaces/i-auth';
import { AuthFormProps } from '../../interfaces/inputs-auth';
import { authSelector, fetchUserData } from '../../redux/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './auth-reject.module.scss';

export const AuthReject: React.FC<AuthFormProps> = React.memo(({ status }) => {
  const dispatch = useAppDispatch();
  const { error, requestData } = useAppSelector((state) => authSelector(state));

  const fetchAgain = async () => {
    await dispatch(fetchUserData(requestData as UserInfo));
  };

  return (
    <div
      className={status === 'error' && error !== 400 ? styles.reject_active : styles.reject}
      data-test-id='status-block'
    >
      <h3 className={styles.reject_title}>Вход не выполнен</h3>
      <h6 className={styles.reject_wrong}>Что-то пошло не так. Попробуйте ещё раз</h6>
      <button className={styles.reject_again} type='button' onClick={fetchAgain}>
        Повторить
      </button>
    </div>
  );
});
