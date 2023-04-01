/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthReject } from '../../components/auth-reject';
import { AuthForm } from '../../components/authorization-form';
import { authSelector } from '../../redux/slices/auth-slice';
import { useAppSelector } from '../../redux/store';

import styles from './auth.module.scss';

export const Auth = () => {
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => authSelector(state));

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
      navigate('/books/all');
    }
  }, [navigate]);

  return (
    <div className={styles.auth} data-test-id='auth'>
      <h6 className={styles.title}>Cleverland</h6>
      <AuthForm status={status} />
      <AuthReject status={status} />
    </div>
  );
};
