/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useEffect } from 'react';

import { AxiosBooks } from '../../axios/axios';
import { IBooks } from '../../interfaces/books-fetch';
import { ActiveCategory } from '../../interfaces/category-state';
import { booksSelector, filterBooks, sortBooks } from '../../redux/slices/books-slice';
import { categoriesSelector } from '../../redux/slices/category-slice';
import { viewSelector } from '../../redux/slices/view-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { BookCard } from '../book-card';

import styles from './books.module.scss';

export const Books = () => {
  const dispatch = useAppDispatch();
  const view = useAppSelector((state) => viewSelector(state));
  const { baseItems, items, status, searchValue, sortTypeDesc } = useAppSelector((state) => booksSelector(state));
  const { activeCategory } = useAppSelector((state) => categoriesSelector(state));

  useEffect(() => {
    const token = localStorage.getItem('token');

    AxiosBooks.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
  }, []);

  useEffect(() => {
    if (status === 'loaded') {
      dispatch(filterBooks(activeCategory.name));
      dispatch(sortBooks(sortTypeDesc));
    }
  }, [activeCategory.name, dispatch, status, searchValue, sortTypeDesc]);

  const booksInActiveCategory = useCallback(
    (category: ActiveCategory) => baseItems.filter((book) => book.categories?.some((c) => c === category.name)),
    [baseItems]
  );

  const categoryValidation = useCallback(
    () => (booksInActiveCategory(activeCategory).length === 0 ? true : false),
    [activeCategory, booksInActiveCategory]
  );

  return (
    <section
      className={
        view && items.length > 0
          ? styles.books_bricks
          : !view && items.length > 0
          ? styles.books_list
          : styles.books_emptySearch
      }
    >
      {items.map((book: IBooks) => (
        <BookCard {...book} key={book.id} />
      ))}
      <h2
        className={
          items.length === 0 && (!categoryValidation() || activeCategory.name === 'Все книги')
            ? styles.books_emptySearch_text
            : styles.books_emptySearch_text_none
        }
        data-test-id='search-result-not-found'
      >
        По запросу ничего не найдено
      </h2>
      <h2
        className={
          items.length === 0 && categoryValidation() && activeCategory.name !== 'Все книги'
            ? styles.books_emptySearch_text
            : styles.books_emptySearch_text_none
        }
        data-test-id='empty-category'
      >
        В этой категории книг ещё нет
      </h2>
    </section>
  );
};
