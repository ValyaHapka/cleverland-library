import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgotPassEmail } from '../../components/forgot-password-form';
import { ForgotSend } from '../../components/forgot-password-send';
import { ResetPasswordForm } from '../../components/reset-password-form';
import { ResetPasswordReject } from '../../components/reset-password-reject';
import { ResetSuccess } from '../../components/reset-success';

import styles from './forgot-password.module.scss';

export const ForgotPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = 'register';
    (document.querySelector('#root') as Element).className = 'auth';

    return () => {
      document.body.className = '';
      (document.querySelector('#root') as Element).className = '';
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/books/all');
    }
  }, [navigate]);

  return (
    <div className={styles.register} data-test-id='auth'>
      <h6 className={styles.title}>Cleverland</h6>
      <ForgotPassEmail />
      <ForgotSend />
      <ResetPasswordForm />
      <ResetSuccess />
      <ResetPasswordReject />
    </div>
  );
};
