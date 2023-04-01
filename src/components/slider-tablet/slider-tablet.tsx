/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Image } from '../../interfaces/books-fetch';
import { SwiperProps } from '../../interfaces/swiper-props';

import styles from './slider-tablet.module.scss';

import 'swiper/css';
import 'swiper/css/pagination';

export const SliderTablet: React.FC<SwiperProps> = React.memo(({ imgs }) => (
  <div className={styles.container}>
    <Swiper modules={[Pagination]} pagination={true} className={styles.container_myswiper} data-test-id='slide-big'>
      {(imgs as Image[]).map((img) => (
        <SwiperSlide className={styles.container_myswiper_slide}>
          <img src={`https://strapi.cleverland.by${img.url}`} alt='' className={styles.container_myswiper_slide_img} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
));
