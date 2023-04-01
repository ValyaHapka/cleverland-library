import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { forgotSelector } from '../../redux/slices/forgot-slice';
import { useAppSelector } from '../../redux/store';

import styles from './reset-success.module.scss';

export const ResetSuccess = () => {
  const navigate = useNavigate();
  const { statusReset } = useAppSelector((state) => forgotSelector(state));

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  return (
    <div
      className={statusReset === 'loaded' && code ? styles.success_active : styles.success}
      data-test-id='status-block'
    >
      <h3 className={styles.success_title}>Новые данные сохранены</h3>
      <h6 className={styles.success_wrong}>Зайдите в личный кабинет, используя свои логин и новый пароль</h6>
      <button className={styles.success_again} type='button' onClick={() => navigate('/auth')}>
        Вход
      </button>
    </div>
  );
};
