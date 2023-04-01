/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import arrow from '../../assets/img/arrow_register.svg';
import { NameInputs } from '../../interfaces/inputs-auth';
import { Step } from '../../interfaces/register-user';
import { changeRequestData, changeStep, registerSelector } from '../../redux/slices/register-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './register-second.module.scss';

export const RegisterSecond = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameInputs>({ mode: 'onBlur' });
  const [nameValue, setnameValue] = useState('');
  const [secondNameValue, setSecondNameValue] = useState('');
  const { error, step, requestData } = useAppSelector((state) => registerSelector(state));
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<NameInputs> = (values) => {
    const secondStepData = { ...requestData, firstName: values.firstName, lastName: values.lastName };

    dispatch(changeRequestData(secondStepData));
    dispatch(changeStep(Step.THIRD));
  };
  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={step === 2 ? styles.form : styles.none}
      data-test-id='register-form'
    >
      <div className={styles.form_info}>
        <h3 className={styles.form_info_title}>Регистрация</h3>
        <h6 className={styles.form_info_steps}>2 шаг из 3</h6>
        <div className={styles.form_info_inputs}>
          <div className={styles.form_info_inputs_field}>
            <input
              {...register('firstName', {
                required: true,
              })}
              autoComplete='off'
              name='firstName'
              className={
                errors.firstName || error === 400
                  ? styles.form_info_inputs_field_input_marked
                  : styles.form_info_inputs_field_input
              }
              required={true}
              onChange={(e) => setnameValue(e.target.value)}
              placeholder='Имя'
            />
            <label
              htmlFor='firstName'
              className={nameValue ? styles.form_info_inputs_field_label_active : styles.form_error}
            >
              Имя
            </label>

            <span
              className={
                errors.firstName ? styles.form_info_inputs_field_error : styles.form_info_inputs_field_error_none
              }
              data-test-id='hint'
            >
              Поле не может быть пустым
            </span>
          </div>

          <div className={styles.form_info_inputs_field}>
            <input
              {...register('lastName', {
                required: true,
              })}
              autoComplete='off'
              name='lastName'
              type='text'
              className={
                errors.lastName || error === 400
                  ? styles.form_info_inputs_field_input_marked
                  : styles.form_info_inputs_field_input
              }
              required={true}
              onChange={(e) => setSecondNameValue(e.target.value)}
              placeholder='Фамилия'
            />
            <label
              htmlFor='lastName'
              className={secondNameValue ? styles.form_info_inputs_field_label_active : styles.form_error}
            >
              Фамилия
            </label>

            <span
              className={
                errors.lastName ? styles.form_info_inputs_field_error : styles.form_info_inputs_field_error_none
              }
              data-test-id='hint'
            >
              Поле не может быть пустым
            </span>
          </div>
        </div>
        <div className={styles.form_info_buttons}>
          <button type='submit' className={styles.form_info_buttons_submit}>
            Последний шаг
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
