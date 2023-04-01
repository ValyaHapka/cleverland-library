/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import openSidebarImg from '../../assets/img/stroke.svg';
import { SidebarProps } from '../../interfaces/sidebar-props';
import { categoriesSelector } from '../../redux/slices/category-slice';
import { useAppSelector } from '../../redux/store';

import styles from './sidebar-desktop.module.scss';

export const SidebarDesktop: React.FC<SidebarProps> = ({
  toggleCategories,
  isOpenCategories,
  pathnameValidation,
  categories,
  changeReduxCategory,
  booksInCategories,
}) => {
  const location = useLocation();
  const { activeCategory, statusCategories } = useAppSelector((state) => categoriesSelector(state));

  return (
    <aside className={isOpenCategories ? styles.sidebar_active : styles.sidebar}>
      <div className={styles.sidebar_title} data-test-id='navigation-showcase' onClick={toggleCategories}>
        <h3
          className={
            pathnameValidation() || location.pathname === '/'
              ? styles.sidebar_title_text_active
              : styles.sidebar_title_text
          }
        >
          Витрина книг
        </h3>

        {statusCategories === 'loaded' && (
          <img src={openSidebarImg} alt='' className={isOpenCategories ? styles.sidebar_title_open : ''} />
        )}
      </div>

      <ul
        className={isOpenCategories && statusCategories === 'loaded' ? styles.sidebar_list : styles.sidebar_list_hide}
      >
        <NavLink to='/books/all' data-test-id='navigation-books'>
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
                  data-test-id={`navigation-${c.path}`}
                >
                  {c.name}
                </span>{' '}
                <span
                  className={
                    activeCategory.name === c.name && pathnameValidation()
                      ? styles.sidebar_list_name_count_active
                      : styles.sidebar_list_name_count
                  }
                  data-test-id={`navigation-book-count-for-${c.path}`}
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
            data-test-id='navigation-terms'
          >
            Правила пользования
          </h2>
        </Link>

        <Link to='/offer'>
          <h2
            className={location.pathname === '/offer' ? styles.sidebar_rules_text_active : styles.sidebar_rules_text}
            data-test-id='navigation-contract'
          >
            Договор оферты
          </h2>
        </Link>
      </div>
      <div className={styles.sidebar_profile}>
        <h2>Профиль</h2>
        <h2>Выход</h2>
      </div>
    </aside>
  );
};
