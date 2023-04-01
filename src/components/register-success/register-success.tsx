import React from 'react';
import { useNavigate } from 'react-router-dom';

import { registerSelector } from '../../redux/slices/register-slice';
import { useAppSelector } from '../../redux/store';

import styles from './register-success.module.scss';

export const RegisterSuccess = () => {
  const { status } = useAppSelector((state) => registerSelector(state));
  const navigate = useNavigate();

  return (
    <div className={status === 'loaded' ? styles.success_active : styles.success} data-test-id='status-block'>
      <h3 className={styles.success_title}>Регистрация успешна</h3>
      <h6 className={styles.success_text}>
        Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль
      </h6>
      <button className={styles.success_link} type='button' onClick={() => navigate('/auth')}>
        Вход
      </button>
    </div>
  );
};
