/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import openSidebarImg from '../../assets/img/stroke.svg';
import { SidebarProps } from '../../interfaces/sidebar-props';
import { categoriesSelector } from '../../redux/slices/category-slice';
import { burgerSelector, changeBurger } from '../../redux/slices/view-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './sidebar-tablet.module.scss';

export const SidebarTablet: React.FC<SidebarProps> = ({
  toggleCategories,
  isOpenCategories,
  pathnameValidation,
  categories,
  changeReduxCategory,
  booksInCategories,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isBurger = useAppSelector((state) => burgerSelector(state));
  const { activeCategory } = useAppSelector((state) => categoriesSelector(state));

  useEffect(() => {
    if (isBurger) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isBurger]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
    dispatch(changeBurger(false));
  };

  return (
    <aside className={isBurger ? styles.sidebar_active : styles.sidebar}>
      <div className={styles.sidebar_title} data-test-id='burger-showcase' onClick={toggleCategories}>
        <h3
          className={
            pathnameValidation() || location.pathname === '/'
              ? styles.sidebar_title_text_active
              : styles.sidebar_title_text
          }
        >
          Витрина книг
        </h3>

        <img src={openSidebarImg} alt='' className={isOpenCategories ? styles.sidebar_title_open : ''} />
      </div>

      <ul
        className={isOpenCategories ? styles.sidebar_list : styles.sidebar_list_hide}
        onClick={() => dispatch(changeBurger(false))}
      >
        <NavLink to='/books/all' data-test-id='burger-books'>
          <h5
            className={
              activeCategory.name === 'Все книги' && (pathnameValidation() || location.pathname === '/')
                ? styles.sidebar_list_name_active
                : styles.sidebar_list_name
            }
            onClick={() => changeReduxCategory('Все книги', 'all')}
          >
            Все книги
          </h5>
        </NavLink>
        {categories.map((c) => (
          <li key={c.name} onClick={() => changeReduxCategory(c.name, c.path)}>
            <NavLink to={`/books/${c.path}`}>
              <h5>
                <span
                  className={
                    activeCategory.name === c.name && pathnameValidation()
                      ? styles.sidebar_list_name_active
                      : styles.sidebar_list_name
                  }
                  data-test-id={`burger-${c.path}`}
                >
                  {c.name}
                </span>{' '}
                <span
                  className={
                    activeCategory.name === c.name && pathnameValidation()
                      ? styles.sidebar_list_name_count_active
                      : styles.sidebar_list_name_count
                  }
                  data-test-id={`burger-book-count-for-${c.path}`}
                >
                  {booksInCategories(c).length}
                </span>
              </h5>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={styles.sidebar_rules}>
        <Link to='/rules'>
          <h2
            className={location.pathname === '/rules' ? styles.sidebar_rules_text_active : styles.sidebar_rules_text}
            onClick={() => dispatch(changeBurger(false))}
            data-test-id='burger-terms'
          >
            Правила пользования
          </h2>
        </Link>

        <Link to='/offer'>
          <h2
            className={location.pathname === '/offer' ? styles.sidebar_rules_text_active : styles.sidebar_rules_text}
            onClick={() => dispatch(changeBurger(false))}
            data-test-id='burger-contract'
          >
            Договор оферты
          </h2>
        </Link>
      </div>
      <div className={styles.sidebar_profile}>
        <h2 onClick={() => dispatch(changeBurger(false))}>Профиль</h2>
        <h2 onClick={logout} data-test-id='exit-button'>
          Выход
        </h2>
      </div>
    </aside>
  );
};
