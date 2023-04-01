import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { forgotSelector } from '../../redux/slices/forgot-slice';
import { useAppSelector } from '../../redux/store';

import styles from './forgot-password-send.module.scss';

export const ForgotSend = () => {
  const { statusSend } = useAppSelector((state) => forgotSelector(state));
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  return (
    <div className={statusSend === 'loaded' && !code ? styles.send_active : styles.send} data-test-id='status-block'>
      <h3 className={styles.send_title}>Письмо выслано</h3>
      <h6 className={styles.send_wrong}>
        Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля
      </h6>
    </div>
  );
};
