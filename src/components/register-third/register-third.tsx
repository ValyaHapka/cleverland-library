/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import Lottie from 'lottie-react';

import arrow from '../../assets/img/arrow_register.svg';
import { emailRegExp } from '../../assets/json/email-regexp';
import Loader from '../../assets/json/loader.json';
import { MailInputs } from '../../interfaces/inputs-auth';
import { RegisterUserInfo, Step } from '../../interfaces/register-user';
import { changeStep, fetchUserData, registerSelector } from '../../redux/slices/register-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './register-third.module.scss';

export const RegisterThird = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<MailInputs>({ mode: 'onBlur' });
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const { error, step, requestData, status } = useAppSelector((state) => registerSelector(state));
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<MailInputs> = async (values) => {
    const thirdStepData = { ...requestData, phone: values.phone, email: values.email };

    dispatch(changeStep(Step.FIRST));
    await dispatch(fetchUserData(thirdStepData as RegisterUserInfo));
  };

  const phoneWatcher = watch('phone');

  useEffect(() => {
    setPhoneValue(phoneWatcher);
  }, [phoneWatcher]);

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={step === 3 ? styles.form : styles.none}
        data-test-id='register-form'
      >
        <div className={styles.form_info}>
          <h3 className={styles.form_info_title}>Регистрация</h3>
          <h6 className={styles.form_info_steps}>3 шаг из 3</h6>
          <div className={styles.form_info_inputs}>
            <Controller
              control={control}
              rules={{ required: true }}
              name='phone'
              render={({ field }) => (
                <div className={styles.form_info_inputs_field}>
                  <MaskedInput
                    {...field}
                    keepCharPositions={true}
                    placeholderChar='x'
                    mask={[
                      '+',
                      '3',
                      '7',
                      '5',
                      ' ',
                      '(',
                      /\d/,
                      /\d/,
                      ')',
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                    autoComplete='off'
                    className={
                      errors.phone || error === 400
                        ? styles.form_info_inputs_field_input_marked
                        : styles.form_info_inputs_field_input
                    }
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder='Номер телефона'
                  />
                  <label
                    htmlFor='phone'
                    className={phoneValue ? styles.form_info_inputs_field_label_active : styles.form_error}
                  >
                    Номер телефона
                  </label>

                  <span
                    className={errors.phone ? styles.form_info_inputs_field_error : styles.form_info_inputs_field_hint}
                    data-test-id='hint'
                  >
                    В формате +375 (xx) xxxxxxx
                  </span>

                  <span
                    className={
                      errors.phone?.type === 'required'
                        ? styles.form_info_inputs_field_error
                        : styles.form_info_inputs_field_error_none
                    }
                    data-test-id='hint'
                  >
                    Поле не может быть пустым
                  </span>
                </div>
              )}
            />

            <div className={styles.form_info_inputs_field}>
              <input
                {...register('email', { required: true, pattern: emailRegExp })}
                autoComplete='off'
                name='email'
                type='text'
                className={
                  errors.email || error === 400
                    ? styles.form_info_inputs_field_input_marked
                    : styles.form_info_inputs_field_input
                }
                required={true}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder='Почта'
              />
              <label
                htmlFor='email'
                className={emailValue ? styles.form_info_inputs_field_label_active : styles.form_error}
              >
                Почта
              </label>

              <span
                className={
                  errors.email?.type === 'required'
                    ? styles.form_info_inputs_field_error
                    : styles.form_info_inputs_field_error_none
                }
                data-test-id='hint'
              >
                Поле не может быть пустым
              </span>

              <span
                className={
                  errors.email?.type === 'pattern'
                    ? styles.form_info_inputs_field_error
                    : styles.form_info_inputs_field_error_none
                }
                data-test-id='hint'
              >
                Введите корректный e-mail
              </span>
            </div>
          </div>
          <div className={styles.form_info_buttons}>
            <button type='submit' className={styles.form_info_buttons_submit}>
              Зарегистрироваться
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
      <div className={status === 'loading' ? styles.loading_data : styles.unloaded_data} data-test-id='loader'>
        <div className={styles.loading_data_blur} />
        <Lottie animationData={Loader} className={styles.loader} />
      </div>
    </React.Fragment>
  );
};
