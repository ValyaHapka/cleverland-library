/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import activeBurgerTablet from '../../assets/img/active-burger-tablet.svg';
import burgerTablet from '../../assets/img/burger_tablet.svg';
import avatar from '../../assets/img/goku.png';
import logo from '../../assets/img/logo.svg';
import { burgerSelector, changeBurger } from '../../redux/slices/view-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './header.module.scss';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isBurger = useAppSelector((state) => burgerSelector(state));

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();

    dispatch(changeBurger(!isBurger));
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <div className={styles.header_content_subcontent}>
          <Link to='/'>
            <img src={logo} alt='logo' className={styles.header_content_subcontent_logo} />
          </Link>

          <img
            src={isBurger ? activeBurgerTablet : burgerTablet}
            alt=''
            className={
              isBurger
                ? styles.header_content_subcontent_burger_tablet_active
                : styles.header_content_subcontent_burger_tablet
            }
            onClick={toggleMenu}
            data-test-id='button-burger'
          />

          <h2>Библиотека</h2>
        </div>
        <div className={styles.header_content_person}>
          <div className={styles.header_content_person_hello}>
            <h4>Привет, Иван!</h4>
            <div className={styles.header_content_person_hello_logo}>
              <img src={avatar} alt='avatar' />
            </div>
          </div>

          <div className={styles.header_content_person_popup}>
            <h5>Профиль</h5>
            <h5 onClick={logout}>Выйти</h5>
          </div>
        </div>
      </div>
    </header>
  );
};
