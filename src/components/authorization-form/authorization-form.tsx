/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';

import arrow from '../../assets/img/arrow_register.svg';
import eye from '../../assets/img/eye.svg';
import eyeClosed from '../../assets/img/eye-closed.svg';
import Loader from '../../assets/json/loader.json';
import { AuthFormProps, Inputs } from '../../interfaces/inputs-auth';
import { authSelector, clearError, fetchUserData, setRequestData } from '../../redux/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './authorization.module.scss';

// eslint-disable-next-line complexity
export const AuthForm: React.FC<AuthFormProps> = React.memo(({ status }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur' });
  const [token, setToken] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const { error } = useAppSelector((state) => authSelector(state));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const info = {
      identifier: values.identifier,
      password: values.password,
    };

    dispatch(setRequestData(info));
    dispatch(clearError());
    await dispatch(fetchUserData(info)).then((res) => setToken(res.payload.jwt));
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      navigate('/books/all');
    }
  }, [navigate, token]);

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={status === 'error' && error !== 400 ? styles.form_error : styles.form}
        data-test-id='auth-form'
      >
        <div className={styles.form_info}>
          <h3 className={styles.form_info_title}> в личный кабинет</h3>
          <div className={styles.form_info_inputs}>
            <div className={styles.form_info_inputs_field}>
              <input
                {...register('identifier', {
                  required: true,
                })}
                autoComplete='off'
                name='identifier'
                className={
                  errors.identifier || error === 400
                    ? styles.form_info_inputs_field_input_marked
                    : styles.form_info_inputs_field_input
                }
                required={true}
                onChange={(e) => setLoginValue(e.target.value)}
              />
              <label
                htmlFor='identifier'
                className={
                  loginValue ? styles.form_info_inputs_field_label_active : styles.form_info_inputs_field_label
                }
              >
                Логин
              </label>

              {errors.identifier && !loginValue ? (
                <span className={styles.form_info_inputs_field_error} data-test-id='hint'>
                  Поле не может быть пустым
                </span>
              ) : (
                <React.Fragment />
              )}
            </div>

            <div className={styles.form_info_inputs_field}>
              <input
                {...register('password', {
                  required: true,
                })}
                autoComplete='off'
                name='password'
                type={hidePassword ? 'password' : 'text'}
                className={
                  errors.password || error === 400
                    ? styles.form_info_inputs_field_input_marked
                    : styles.form_info_inputs_field_input
                }
                required={true}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              <label
                htmlFor='password'
                className={
                  passwordValue ? styles.form_info_inputs_field_label_active : styles.form_info_inputs_field_label
                }
              >
                Пароль
              </label>

              {passwordValue && hidePassword && (
                <img
                  src={eyeClosed}
                  alt=''
                  onClick={() => setHidePassword(!hidePassword)}
                  className={styles.form_info_inputs_field_eye}
                  data-test-id='eye-closed'
                />
              )}

              {passwordValue && !hidePassword && (
                <img
                  src={eye}
                  alt=''
                  onClick={() => setHidePassword(!hidePassword)}
                  className={styles.form_info_inputs_field_eye}
                  data-test-id='eye-opened'
                />
              )}

              <span
                className={
                  errors.password && !passwordValue
                    ? styles.form_info_inputs_field_error
                    : styles.form_info_inputs_field_error_none
                }
                data-test-id='hint'
              >
                Поле не может быть пустым
              </span>

              <span
                className={
                  error === 400 ? styles.form_info_inputs_field_error : styles.form_info_inputs_field_error_none
                }
                data-test-id='hint'
              >
                Неверный логин или пароль!
              </span>
              <Link to='/forgot-pass'>
                <span
                  className={
                    error === 400 ? styles.form_info_inputs_field_forgot_error : styles.form_info_inputs_field_forgot
                  }
                >
                  {error === 400 ? 'Восстановить?' : 'Забыли логин или пароль?'}
                </span>
              </Link>
            </div>
          </div>
          <div className={styles.form_info_buttons}>
            <button type='submit' className={styles.form_info_buttons_submit}>
              вход
            </button>
            <div className={styles.form_info_buttons_register}>
              <span className={styles.form_info_buttons_register_text}>Нет учётной записи?</span>
              <div className={styles.form_info_buttons_register_navigation}>
                <Link to='/registration'>
                  <span>Регистрация</span>
                  <img src={arrow} alt='' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className={status === 'loading' ? styles.loading_data : styles.unloaded_data} data-test-id='loader'>
        <div className={styles.loading_data_blur} />
        <Lottie animationData={Loader} className={styles.loader} />
      </div>
    </React.Fragment>
  );
});
