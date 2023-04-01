import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { ResetPassword } from '../../interfaces/forgot-pass-int';
import { fetchResetPassword, forgotSelector } from '../../redux/slices/forgot-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './reset-password-reject.module.scss';

export const ResetPasswordReject = () => {
  const dispatch = useAppDispatch();
  const { requestData, statusReset } = useAppSelector((state) => forgotSelector(state));

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const fetchAgain = async () => {
    await dispatch(fetchResetPassword(requestData as ResetPassword));
  };

  return (
    <div className={statusReset === 'error' && code ? styles.reject_active : styles.reject} data-test-id='status-block'>
      <h3 className={styles.reject_title}>Данные не сохранились</h3>
      <h6 className={styles.reject_wrong}>Что-то пошло не так. Попробуйте ещё раз</h6>
      <button className={styles.reject_again} type='button' onClick={fetchAgain}>
        Повторить
      </button>
    </div>
  );
};
