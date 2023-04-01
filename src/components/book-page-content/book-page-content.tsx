/* eslint-disable complexity */
/* eslint-disable react/jsx-no-useless-fragment */

import React, { useCallback, useEffect, useState } from 'react';

import catIcon from '../../assets/img/cat_icon.svg';
import { FetchedBook } from '../../interfaces/books-fetch';
import { activeBookSelector } from '../../redux/slices/active-book-slice';
import { useAppSelector } from '../../redux/store';
import { Slider } from '../slider-desktop';
import { SliderTablet } from '../slider-tablet';

import styles from './book-page-content.module.scss';

interface BookPageContentProps {
  book: FetchedBook;
}

export const BookPageContent: React.FC<BookPageContentProps> = ({ book }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const { status } = useAppSelector((state) => activeBookSelector(state));

  const onChangeWidth = useCallback(() => setWidth(window.innerWidth), []);

  useEffect(() => {
    window.addEventListener('resize', onChangeWidth);

    return () => {
      window.removeEventListener('resize', onChangeWidth);
    };
  }, [book.authors, onChangeWidth, width]);

  return (
    <React.Fragment>
      {width >= 957 ? (
        <div className={styles.book_wrapper}>
          <div className={styles.book_wrapper_content}>
            {book.images ? (
              <div className={styles.book_wrapper_content_images}>
                {book.images.length > 1 ? (
                  <Slider imgs={book.images} />
                ) : (
                  <div className={styles.book_wrapper_content_images_img}>
                    <img
                      src={`https://strapi.cleverland.by${book.images[0].url}`}
                      alt={book.title}
                      className={styles.book_wrapper_content_images_img_bookImg}
                      data-test-id='slide-big'
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.book_wrapper_content_images}>
                <div className={styles.book_wrapper_content_images_img}>
                  <img src={catIcon} alt={book.title} className={styles.book_wrapper_content_images_img_cat} />
                </div>
              </div>
            )}

            <div className={styles.book_wrapper_content_subinfo}>
              <h1 data-test-id='book-title'> {book.title}</h1>
              <div className={styles.book_wrapper_content_subinfo_author}>
                {book.authors?.length === 1 ? (
                  <span>
                    {book.authors[0]}, <span> {book.issueYear}</span>
                  </span>
                ) : (
                  <React.Fragment>
                    <span>{status === 'loaded' && (book.authors as string[])[0]},</span>
                    <span>
                      {status === 'loaded' && (book.authors as string[])[1]}, <span> {book.issueYear}</span>
                    </span>
                  </React.Fragment>
                )}
              </div>

              <button
                type='button'
                className={
                  book.delivery?.handed
                    ? styles.book_wrapper_content_subinfo_booking_booked
                    : book.booking?.order && !book.delivery?.handed
                    ? styles.book_wrapper_content_subinfo_booking_person
                    : styles.book_wrapper_content_subinfo_booking
                }
              >
                {book.delivery?.handed
                  ? `Занята до ${book.delivery?.dateHandedTo}`
                  : book.booking?.order && !book.delivery?.handed
                  ? 'Забронирована'
                  : 'Забронировать'}
              </button>

              <div className={styles.book_wrapper_content_subinfo_about}>
                <h5>О книге</h5>
                <p>{book.description}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.book_wrapper}>
          <div className={styles.book_wrapper_content}>
            {book.images ? (
              <SliderTablet imgs={book.images} />
            ) : (
              <div className={styles.book_wrapper_content_img}>
                <img src={catIcon} alt={book.title} className={styles.book_wrapper_content_img_cat} />
              </div>
            )}

            <div className={styles.book_wrapper_content_subinfo}>
              <h1 data-test-id='book-title'> {book.title}</h1>
              <div className={styles.book_wrapper_content_subinfo_author}>
                {book.authors?.length === 1 ? (
                  <span>
                    {book.authors[0]}, <span> {book.issueYear}</span>
                  </span>
                ) : (
                  <React.Fragment>
                    <span>{status === 'loaded' && (book.authors as string[])[0]},</span>{' '}
                    <span>
                      {status === 'loaded' && (book.authors as string[])[1]}, <span> {book.issueYear}</span>
                    </span>
                  </React.Fragment>
                )}
              </div>

              <button
                type='button'
                className={
                  book.delivery?.handed
                    ? styles.book_wrapper_content_subinfo_booking_booked
                    : book.booking?.order && !book.delivery?.handed
                    ? styles.book_wrapper_content_subinfo_booking_person
                    : styles.book_wrapper_content_subinfo_booking
                }
              >
                {book.delivery?.handed
                  ? `Занята до ${book.delivery?.dateHandedTo}`
                  : book.booking?.order && !book.delivery?.handed
                  ? 'Забронирована'
                  : 'Забронировать'}
              </button>
            </div>
          </div>
          <div className={styles.book_wrapper_content_subinfo_about}>
            <h5>О книге</h5>
            <p>{book.description}</p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
