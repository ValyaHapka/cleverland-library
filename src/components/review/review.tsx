import React from 'react';

import activeStar from '../../assets/img/active_star.svg';
import inactiveStar from '../../assets/img/star.svg';
import { Comments } from '../../interfaces/books-fetch';

import styles from './review.module.scss';

interface ReviewProps {
  comment: Comments;
}

export const Review: React.FC<ReviewProps> = React.memo(({ comment }) => {
  const activeStars = [...new Array(comment.rating as number)].map(() => <img src={activeStar} alt='' />);
  const inactiveStars = [...new Array(5 - (comment.rating as number))].map(() => <img src={inactiveStar} alt='' />);

  const avatar = `https://strapi.cleverland.by/api${comment.user.avatarUrl}`;

  return (
    <ul className={styles.reviews_block}>
      <li className={styles.reviews_block_feedback}>
        <div className={styles.reviews_block_feedback_person}>
          <img src={avatar} alt='' />
          <div className={styles.reviews_block_feedback_person_text}>
            <span>
              {comment.user.firstName} {comment.user.lastName}
            </span>
            <span>{comment.createdAt}</span>
          </div>
        </div>
        {comment.rating && (
          <div className={styles.rank_stars}>
            {activeStars}
            {inactiveStars}
          </div>
        )}
        {comment.text && <p>{comment.text}</p>}
      </li>
    </ul>
  );
});
