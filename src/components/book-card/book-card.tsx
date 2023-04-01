/* eslint-disable complexity */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { Link, useLocation } from 'react-router-dom';

import activeStar from '../../assets/img/active_star.svg';
import catIcon from '../../assets/img/cat_icon.svg';
import inactiveStar from '../../assets/img/star.svg';
import { IBooks } from '../../interfaces/books-fetch';
import { booksSelector } from '../../redux/slices/books-slice';
import { categoriesSelector } from '../../redux/slices/category-slice';
import { viewSelector } from '../../redux/slices/view-slice';
import { useAppSelector } from '../../redux/store';

import cardStyles from './book-card.module.scss';
import listViewStyles from './book-card-list.module.scss';

export const BookCard: React.FC<IBooks> = React.memo(
  ({ title, image, booking, authors, issueYear, rating, id, delivery }) => {
    const location = useLocation();
    const view = useAppSelector((state) => viewSelector(state));
    const { searchValue } = useAppSelector((state) => booksSelector(state));
    const { activeCategory } = useAppSelector((state) => categoriesSelector(state));

    const activeStars = [...new Array(Math.floor(rating as number))].map(() => <img src={activeStar} alt='' />);
    const inactiveStars = [...new Array(5 - Math.floor(rating as number))].map(() => <img src={inactiveStar} alt='' />);

    const path = `/${activeCategory.path}/${id}`;
    const pathWithBooks = `/books/all/${id}`;

    const img = `https://strapi.cleverland.by${image?.url}`;

    const changedTitle = (bookTitle: string) => {
      if (bookTitle.length >= 60) {
        return bookTitle.split('', 57).join('').padEnd(60, '.');
      }

      return bookTitle;
    };

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
    };

    useEffect(() => {
      const items = document.querySelectorAll('mark');

      // eslint-disable-next-line no-return-assign, no-param-reassign
      (items as NodeListOf<HTMLElement>).forEach((el) => (el.dataset.testId = 'highlight-matches'));
    }, [searchValue]);

    if (view) {
      return (
        <Link to={location.pathname === '/' ? pathWithBooks : path}>
          <div className={cardStyles.card} data-test-id='card'>
            <div className={cardStyles.card_img}>
              {image ? (
                <img src={img} alt='' className={cardStyles.card_img_bookImg} />
              ) : (
                <img src={catIcon} alt='' className={cardStyles.card_img_cat} />
              )}
            </div>

            <div className={cardStyles.card_rank} onClick={handleClick}>
              {rating ? (
                <React.Fragment>
                  <React.Fragment>{activeStars}</React.Fragment>
                  <React.Fragment>{inactiveStars}</React.Fragment>
                </React.Fragment>
              ) : (
                <span>ещё нет оценок</span>
              )}
            </div>
            <div className={cardStyles.card_info}>
              <h2>
                <Highlighter
                  highlightClassName={cardStyles.card_info_title_highlighted}
                  searchWords={[searchValue]}
                  autoEscape={true}
                  textToHighlight={changedTitle(title)}
                />
              </h2>

              {(authors as string[]).length === 1 ? (
                <span>
                  {(authors as string[])[0]}, <span>{issueYear}</span>
                </span>
              ) : (
                <React.Fragment>
                  <span>{(authors as string[])[0]}</span>
                  <br />
                  <span>
                    {(authors as string[])[1]}, <span>{issueYear}</span>
                  </span>
                </React.Fragment>
              )}
            </div>
            <button
              type='button'
              className={
                delivery?.handed
                  ? cardStyles.card_booking_booked
                  : booking?.order && !delivery?.handed
                  ? cardStyles.card_booking_person
                  : cardStyles.card_booking
              }
              onClick={handleClick}
            >
              {delivery?.handed
                ? `Занята до ${delivery?.dateHandedTo}`
                : booking?.order && !delivery?.handed
                ? 'Забронирована'
                : 'Забронировать'}
            </button>
          </div>
        </Link>
      );
    }

    return (
      <Link to={path}>
        <div className={listViewStyles.card}>
          <div className={listViewStyles.card_img}>
            {image ? (
              <img src={img} alt='' className={listViewStyles.card_img_bookImg} />
            ) : (
              <img src={catIcon} alt='' />
            )}
          </div>
          <div className={listViewStyles.card_content}>
            <div className={listViewStyles.card_content_info}>
              <h2>
                <Highlighter
                  highlightClassName={cardStyles.card_info_title_highlighted}
                  searchWords={[searchValue]}
                  autoEscape={true}
                  textToHighlight={title}
                />
              </h2>
              {(authors as string[]).length === 1 ? (
                <span>
                  {(authors as string[])[0]}, <span>{issueYear}</span>
                </span>
              ) : (
                <React.Fragment>
                  <span>{(authors as string[])[0]}, </span>
                  <span>
                    {(authors as string[])[1]}, <span>{issueYear}</span>
                  </span>
                </React.Fragment>
              )}
            </div>
            <div className={listViewStyles.card_content_buttons}>
              <div className={listViewStyles.card_content_buttons_rank} onClick={handleClick}>
                {rating ? (
                  <React.Fragment>
                    <React.Fragment>{activeStars}</React.Fragment>
                    <React.Fragment>{inactiveStars}</React.Fragment>
                  </React.Fragment>
                ) : (
                  <span>ещё нет оценок</span>
                )}
              </div>
              <button
                type='button'
                className={
                  delivery?.handed
                    ? listViewStyles.card_content_buttons_booking_booked
                    : booking?.order && !delivery?.handed
                    ? listViewStyles.card_content_buttons_booking_person
                    : listViewStyles.card_content_buttons_booking
                }
                onClick={handleClick}
              >
                {delivery?.handed
                  ? `Занята до ${delivery?.dateHandedTo}`
                  : booking?.order && !delivery?.handed
                  ? 'Забронирована'
                  : 'Забронировать'}
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }
);
