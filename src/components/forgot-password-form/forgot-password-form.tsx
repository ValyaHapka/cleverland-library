/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Lottie from 'lottie-react';

import arrow from '../../assets/img/arrow_register.svg';
import backArrow from '../../assets/img/back_arrow.svg';
import { emailRegExp } from '../../assets/json/email-regexp';
import Loader from '../../assets/json/loader.json';
import { ForgotInput } from '../../interfaces/forgot-pass-int';
import { fetchForgotPassword, forgotSelector } from '../../redux/slices/forgot-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './forgot-password-form.module.scss';

export const ForgotPassEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotInput>({ mode: 'onBlur' });
  const [emailValue, setEmailValue] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { statusSend, errorSend } = useAppSelector((state) => forgotSelector(state));
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const onSubmit: SubmitHandler<ForgotInput> = async (values) => {
    const email = { email: values.email };

    await dispatch(fetchForgotPassword(email));
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={(statusSend === '' || statusSend === 'error') && !code ? styles.form : styles.none}
        data-test-id='send-email-form'
      >
        <div className={styles.form_info_auth}>
          <img src={backArrow} alt='' className={styles.form_info_auth_arrow} onClick={() => navigate('/auth')} />
          <span className={styles.form_info_auth_text}>Вход в личный кабинет</span>
        </div>
        <div className={styles.form_info}>
          <h3 className={styles.form_info_title}>Восстановление пароля</h3>
          <div className={styles.form_info_inputs}>
            <div className={styles.form_info_inputs_field}>
              <input
                {...register('email', { required: true, pattern: emailRegExp })}
                autoComplete='off'
                name='email'
                type='text'
                className={
                  errors.email ? styles.form_info_inputs_field_input_marked : styles.form_info_inputs_field_input
                }
                required={true}
                onChange={(e) => setEmailValue(e.target.value)}
              />
              <label
                htmlFor='email'
                className={
                  emailValue ? styles.form_info_inputs_field_label_active : styles.form_info_inputs_field_label
                }
              >
                Почта
              </label>

              <span
                className={errors.email?.type === 'required' ? styles.form_info_inputs_field_error : styles.none}
                data-test-id='hint'
              >
                Поле не может быть пустым
              </span>

              {errors.email?.type === 'pattern' ? (
                <span className={styles.form_info_inputs_field_error} data-test-id='hint'>
                  Введите корректный e-mail
                </span>
              ) : (
                <React.Fragment />
              )}

              <span
                className={
                  statusSend === 'error'
                    ? styles.form_info_inputs_field_error
                    : styles.form_info_inputs_field_error_none
                }
                data-test-id='hint'
              >
                error
              </span>
            </div>
          </div>
          <div className={styles.form_info_buttons}>
            <button type='submit' className={styles.form_info_buttons_submit}>
              Восстановить
            </button>
            <div className={styles.form_info_buttons_register}>
              <span className={styles.form_info_buttons_register_text}>Есть учётная запись?</span>
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
      <div className={statusSend === 'loading' ? styles.loading_data : styles.unloaded_data} data-test-id='loader'>
        <div className={styles.loading_data_blur} />
        <Lottie animationData={Loader} className={styles.loader} />
      </div>
    </React.Fragment>
  );
};
