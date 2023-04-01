import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RegisterError } from '../../components/register-error';
import { RegisterFirst } from '../../components/register-first';
import { RegisterSecond } from '../../components/register-second';
import { RegisterSuccess } from '../../components/register-success';
import { RegisterThird } from '../../components/register-third';
import { RegisterWrongData } from '../../components/register-wrong-data/register-wrong-data';

import styles from './register.module.scss';

export const Register = () => {
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
      navigate('/books/all');
    }
  }, [navigate]);

  return (
    <div className={styles.register} data-test-id='auth'>
      <h6 className={styles.title}>Cleverland</h6>
      <RegisterFirst />
      <RegisterSecond />
      <RegisterThird />
      <RegisterSuccess />
      <RegisterWrongData />
      <RegisterError />
    </div>
  );
};
