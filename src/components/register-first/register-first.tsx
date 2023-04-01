/* eslint-disable complexity */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import arrow from '../../assets/img/arrow_register.svg';
import eye from '../../assets/img/eye.svg';
import eyeClosed from '../../assets/img/eye-closed.svg';
import pass_access from '../../assets/img/pass_access.svg';
import { RegisterInputs } from '../../interfaces/inputs-auth';
import { Step } from '../../interfaces/register-user';
import { changeRequestData, changeStep, registerSelector } from '../../redux/slices/register-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './register-first.module.scss';

export const RegisterFirst = () => {
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors, isValid },
  } = useForm<RegisterInputs>({ mode: 'onBlur' });
  const [hidePassword, setHidePassword] = useState(true);
  const [loginFocus, setLoginFocus] = useState(false);
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);
  const { error, step, requestData, status } = useAppSelector((state) => registerSelector(state));
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<RegisterInputs> = (values) => {
    const firstStepData = { ...requestData, username: values.username, password: values.password };

    dispatch(changeStep(Step.SECOND));
    dispatch(changeRequestData(firstStepData));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={step === 1 && status === '' ? styles.form : styles.none}
      data-test-id='register-form'
    >
      <div className={styles.form_info}>
        <h3 className={styles.form_info_title}>Регистрация</h3>
        <h6 className={styles.form_info_steps}>1 шаг из 3</h6>
        <div className={styles.form_info_inputs}>
          <div className={styles.form_info_inputs_field}>
            <input
              placeholder='Придумайте логин для входа'
              onFocus={() => setLoginFocus(true)}
              {...register('username', {
                required: true,
                pattern: /(?=.*[0-9])(?=.*[a-z])/g,
                onBlur: () => setLoginFocus(false),
              })}
              autoComplete='off'
              name='username'
              className={
                errors.username || error === 400
                  ? styles.form_info_inputs_field_input_marked
                  : styles.form_info_inputs_field_input
              }
              required={true}
              onChange={(e) => setLoginValue(e.target.value)}
            />
            <label
              htmlFor='username'
              className={loginValue ? styles.form_info_inputs_field_label_active : styles.form_error}
            >
              Придумайте логин для входа
            </label>

            <span
              className={errors.username?.type === 'required' ? styles.form_info_inputs_field_error : styles.none}
              data-test-id='hint'
            >
              Поле не может быть пустым
            </span>

            <span
              className={
                errors.username && !loginFocus
                  ? styles.form_info_inputs_field_error
                  : styles.form_info_inputs_field_hint
              }
              data-test-id='hint'
            >
              Используйте для логина{' '}
              <span
                className={
                  !loginValue.match(/[a-z]/) && loginFocus && loginValue
                    ? styles.form_info_inputs_field_error
                    : styles.form_info_inputs_field_error_hint
                }
              >
                латинский алфавит
              </span>{' '}
              и{' '}
              <span
                className={
                  !loginValue.match(/\d/) && loginFocus && loginValue
                    ? styles.form_info_inputs_field_error
                    : styles.form_info_inputs_field_error_hint
                }
              >
                цифры
              </span>
            </span>
          </div>

          <div className={styles.form_info_inputs_field}>
            <input
              onFocus={() => setPasswordFocus(true)}
              {...register('password', {
                required: true,
                pattern: /(?=.*[0-9])(?=.*[A-Z])/g,
                minLength: 7,
                onBlur: () => setPasswordFocus(false),
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
              className={passwordValue ? styles.form_info_inputs_field_label_active : styles.form_error}
            >
              Пароль
            </label>

            {passwordValue && !getFieldState('password').invalid && (
              <img src={pass_access} alt='' className={styles.form_info_inputs_field_access} data-test-id='checkmark' />
            )}

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
              className={errors.password?.type === 'required' ? styles.form_info_inputs_field_error : styles.none}
              data-test-id='hint'
            >
              Поле не может быть пустым
            </span>

            <span
              className={
                errors.password && !passwordFocus
                  ? styles.form_info_inputs_field_error
                  : styles.form_info_inputs_field_hint
              }
              data-test-id='hint'
            >
              Пароль{' '}
              <span
                className={
                  passwordValue.length < 8 && passwordFocus && passwordValue
                    ? styles.form_info_inputs_field_error
                    : styles.form_info_inputs_field_error_hint
                }
              >
                не менее 8 символов
              </span>
              , с{' '}
              <span
                className={
                  !passwordValue.match(/[A-Z]/) && passwordFocus && passwordValue
                    ? styles.form_info_inputs_field_error
                    : styles.form_info_inputs_field_error_hint
                }
              >
                заглавной буквой
              </span>{' '}
              и{' '}
              <span
                className={
                  !passwordValue.match(/\d/) && passwordFocus && passwordValue
                    ? styles.form_info_inputs_field_error
                    : styles.form_info_inputs_field_error_hint
                }
              >
                цифрой
              </span>
            </span>
          </div>
        </div>
        <div className={styles.form_info_buttons}>
          <button
            type='submit'
            className={styles.form_info_buttons_submit}
            disabled={loginValue && passwordValue ? false : true}
          >
            Следующий шаг
          </button>
          <div className={styles.form_info_buttons_register}>
            <span className={styles.form_info_buttons_register_text}>Есть учётная запись?</span>
            <div className={styles.form_info_buttons_register_navigation}>
              <Link to='/auth'>
                <span>Войти</span>
                <img src={arrow} alt='' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
