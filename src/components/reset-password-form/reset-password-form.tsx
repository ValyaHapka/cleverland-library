/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable complexity */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Lottie from 'lottie-react';

import eye from '../../assets/img/eye.svg';
import eyeClosed from '../../assets/img/eye-closed.svg';
import pass_access from '../../assets/img/pass_access.svg';
import Loader from '../../assets/json/loader.json';
import { ResetPasswordInputs } from '../../interfaces/forgot-pass-int';
import { fetchResetPassword, forgotSelector } from '../../redux/slices/forgot-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './reset-password-form.module.scss';

export const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({ mode: 'onBlur' });
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmationValue, setConfirmationValue] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmation, setHideConfirmation] = useState(true);
  const [passwordsEqual, setPasswordsEqual] = useState(false);

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const dispatch = useAppDispatch();
  const { statusReset } = useAppSelector((state) => forgotSelector(state));

  useEffect(() => {
    setPasswordsEqual(passwordValue === confirmationValue);
  }, [passwordValue, confirmationValue]);

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (values) => {
    const passwords = {
      password: values.password,
      passwordConfirmation: values.passwordConfirmation,
      code: code as string,
    };

    await dispatch(fetchResetPassword(passwords));
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={statusReset === '' && code ? styles.form : styles.none}
        data-test-id='reset-password-form'
      >
        <div className={styles.form_info}>
          <h3 className={styles.form_info_title}>Восстановление пароля</h3>
          <div className={styles.form_info_inputs}>
            <div className={styles.form_info_inputs_field}>
              <input
                onFocus={() => setPasswordFocus(true)}
                {...register('password', {
                  required: true,
                  pattern: /(?=.*[0-9])(?=.*[A-Z])/g,
                  minLength: 8,
                  onBlur: () => setPasswordFocus(false),
                })}
                autoComplete='off'
                name='password'
                type={hidePassword ? 'password' : 'text'}
                className={
                  errors.password ? styles.form_info_inputs_field_input_marked : styles.form_info_inputs_field_input
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
                Новый пароль
              </label>

              {passwordValue && !getFieldState('password').invalid && (
                <img
                  src={pass_access}
                  alt=''
                  className={styles.form_info_inputs_field_access}
                  data-test-id='checkmark'
                />
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

              {errors.password && !passwordValue ? (
                <span className={styles.form_info_inputs_field_error} data-test-id='hint'>
                  Поле не может быть пустым
                </span>
              ) : (
                <React.Fragment />
              )}

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
                    passwordValue.length <= 8 && passwordFocus && passwordValue
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
            <div className={styles.form_info_inputs_field}>
              <input
                {...register('passwordConfirmation', {
                  required: true,
                  pattern: /(?=.*[0-9])(?=.*[A-Z])/g,
                  minLength: 8,
                })}
                autoComplete='off'
                name='passwordConfirmation'
                type={hideConfirmation ? 'password' : 'text'}
                className={
                  errors.password ? styles.form_info_inputs_field_input_marked : styles.form_info_inputs_field_input
                }
                required={true}
                onChange={(e) => setConfirmationValue(e.target.value)}
              />
              <label
                htmlFor='passwordConfirmation'
                className={
                  confirmationValue ? styles.form_info_inputs_field_label_active : styles.form_info_inputs_field_label
                }
              >
                Повторите пароль
              </label>

              {confirmationValue && hideConfirmation && (
                <img
                  src={eyeClosed}
                  alt=''
                  onClick={() => setHidePassword(!confirmationValue)}
                  className={styles.form_info_inputs_field_eye}
                  data-test-id='eye-closed'
                />
              )}

              {confirmationValue && !hideConfirmation && (
                <img
                  src={eye}
                  alt=''
                  onClick={() => setHidePassword(!confirmationValue)}
                  className={styles.form_info_inputs_field_eye}
                  data-test-id='eye-opened'
                />
              )}

              {errors.passwordConfirmation && !confirmationValue ? (
                <span className={styles.form_info_inputs_field_error} data-test-id='hint'>
                  Поле не может быть пустым
                </span>
              ) : (
                <React.Fragment />
              )}

              <span
                className={passwordsEqual ? styles.form_info_inputs_field_none : styles.form_info_inputs_field_error}
                data-test-id='hint'
              >
                Пароли не совпадают
              </span>
            </div>
          </div>
          <div className={styles.form_info_buttons}>
            <button
              type='submit'
              className={passwordsEqual ? styles.form_info_buttons_submit : styles.form_info_buttons_submit_disabled}
              disabled={!passwordsEqual}
            >
              Сохранить изменения
            </button>
            <p className={styles.form_info_buttons_text}>
              После сохранения войдите в библиотеку, используя новый пароль
            </p>
          </div>
        </div>
      </form>
      <div className={statusReset === 'loading' ? styles.loading_data : styles.unloaded_data} data-test-id='loader'>
        <div className={styles.loading_data_blur} />
        <Lottie animationData={Loader} className={styles.loader} />
      </div>
    </React.Fragment>
  );
};
