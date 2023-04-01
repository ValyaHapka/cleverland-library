/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useCallback, useEffect, useRef, useState } from 'react';

import activeSearchImg from '../../assets/img/active_search.svg';
import closeSearchImg from '../../assets/img/active-burger-mobile.svg';
import inactiveRowsViewImg from '../../assets/img/Icon_Action.svg';
import sortImgDesc from '../../assets/img/icon-sort-descending.svg';
import activeSquareViewImg from '../../assets/img/icon-square-four.svg';
import activeRowsViewImg from '../../assets/img/list_img_active.svg';
import searchImg from '../../assets/img/search_icon.svg';
import sortImgAsc from '../../assets/img/sort-asc.svg';
import inactiveSquareViewImg from '../../assets/img/square_img_inactive.svg';
import { booksSelector, setReduxSearchValue, sortBooks } from '../../redux/slices/books-slice';
import { changeView, viewSelector } from '../../redux/slices/view-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './navigation.module.scss';

export const Navigation = () => {
  const view = useAppSelector((state) => viewSelector(state));
  const { sortTypeDesc } = useAppSelector((state) => booksSelector(state));
  const dispatch = useAppDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const [localvalue, setLocalValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearch, setSearch] = useState(false);

  const onChangeWidth = useCallback(() => setWidth(window.innerWidth), []);

  const inputClick = () => {
    setSearch(true);
    (inputRef.current as HTMLInputElement).focus();
  };

  const closeInput = useCallback(() => {
    setSearch(false);
  }, []);

  const updateValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
    dispatch(setReduxSearchValue(event.target.value));
  };

  useEffect(() => {
    window.addEventListener('resize', onChangeWidth);

    return () => {
      window.removeEventListener('resize', onChangeWidth);
    };
  }, [onChangeWidth]);

  return (
    <nav className={styles.navigation} data-test-id='burger-navigation'>
      <div className={styles.navigation_filters}>
        <div className={isSearch ? styles.navigation_filters_search_active : styles.navigation_filters_search}>
          {width > 767 && (
            <img
              src={isSearch ? activeSearchImg : searchImg}
              alt=''
              className={styles.navigation_filters_search_icon}
            />
          )}
          <button
            className={
              isSearch ? styles.navigation_filters_search_button_hide : styles.navigation_filters_search_button
            }
            type='button'
            onClick={inputClick}
            data-test-id='button-search-open'
          >
            <img src={searchImg} alt='' className={styles.navigation_filters_search_icon} />
          </button>

          <input
            data-test-id='input-search'
            type='text'
            className={isSearch ? styles.navigation_filters_search_inp_active : styles.navigation_filters_search_inp}
            placeholder={width >= 768 ? 'Поиск книги или автора…' : ''}
            ref={inputRef}
            value={localvalue}
            onChange={updateValues}
            onFocus={() => setSearch(true)}
            onBlur={() => setSearch(false)}
          />
          <img
            src={closeSearchImg}
            alt=''
            className={
              width < 768 && isSearch
                ? styles.navigation_filters_search_close_active
                : styles.navigation_filters_search_close
            }
            onClick={closeInput}
            data-test-id='button-search-close'
          />
        </div>
        {!isSearch || width > 767 ? (
          <div
            className={styles.navigation_filters_sort}
            onClick={() => dispatch(sortBooks(!sortTypeDesc))}
            data-test-id='sort-rating-button'
          >
            <img src={sortTypeDesc ? sortImgDesc : sortImgAsc} alt='' className={styles.search_icon} />
            <h6>По рейтингу</h6>
          </div>
        ) : (
          <React.Fragment />
        )}
      </div>

      {!isSearch || width >= 767 ? (
        <div className={styles.navigation_view}>
          <button
            data-test-id='button-menu-view-window'
            className={view ? styles.navigation_view_button_active : styles.navigation_view_button}
            type='button'
            onClick={() => dispatch(changeView(true))}
          >
            <img src={view ? activeSquareViewImg : inactiveSquareViewImg} alt='' />
          </button>
          <button
            data-test-id='button-menu-view-list'
            className={view ? styles.navigation_view_button : styles.navigation_view_button_active}
            type='button'
            onClick={() => dispatch(changeView(false))}
          >
            <img src={view ? inactiveRowsViewImg : activeRowsViewImg} alt='' />
          </button>
        </div>
      ) : (
        <React.Fragment />
      )}
    </nav>
  );
};
