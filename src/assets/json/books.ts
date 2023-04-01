import { FullBook } from '../../interfaces/full-book';
import bookImg from '../img/bookImg.jpeg';
import goku from '../img/goku.png';
import money from '../img/money.jpg';
import pinkCar from '../img/pink-car.jpg';
import ramzan from '../img/ramzan.jpg';

export const books: FullBook[] = [
  // 1
  {
    id: 1,
    img: null,
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов',
    author: ['Адитья Бхаргава'],
    year: 2019,
    rank: 4,
    booking: {
      status: false,
      date: null,
    },
  },
  //   2
  {
    id: 2,
    img: [bookImg],
    name: 'Грокаем алгоритмы. Иллюстрированное ',
    author: ['Адитья Бхаргава'],
    year: 2019,
    rank: 4,
    booking: {
      status: false,
      date: null,
    },
  },
  //   3
  {
    id: 3,
    img: [bookImg, goku, ramzan, money, pinkCar],
    name: 'Грокаем алгоритмы.',
    author: ['Адитья Бхаргава'],
    year: 2019,
    rank: 4,
    booking: {
      status: true,
      date: '03.05',
    },
  },
  //   4
  {
    id: 4,
    img: [bookImg],
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов',
    author: ['Адитья Бхаргава'],
    year: 2019,
    rank: 4,
    booking: {
      status: true,
      date: null,
    },
  },
  //   5
  {
    id: 5,
    img: [bookImg],
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов',
    author: ['Адитья Бхаргава', 'Патрик Нимейер'],
    year: 2019,
    rank: 4,
    booking: {
      status: false,
      date: null,
    },
  },
  //   6
  {
    id: 6,
    img: null,
    name: 'Грокаем алгоритмы. Иллюстрированное',
    author: ['Адитья Бхаргава', 'Патрик Нимейер'],
    year: 2019,
    rank: null,
    booking: {
      status: false,
      date: null,
    },
  },
  //   7
  {
    id: 7,
    img: [bookImg],
    name: 'Грокаем алгоритмы.',
    author: ['Адитья Бхаргава', 'Патрик Нимейер'],
    year: 2019,
    rank: 4,
    booking: {
      status: false,
      date: null,
    },
  },
  //   8
  {
    id: 8,
    img: [bookImg],
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов',
    author: ['Адитья Бхаргава', 'Патрик Нимейер'],
    year: 2019,
    rank: 4,
    booking: {
      status: false,
      date: null,
    },
  },
  //   9
  {
    id: 9,
    img: [bookImg],
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов',
    author: ['Адитья Бхаргава'],
    year: 2019,
    rank: 4,
    booking: {
      status: false,
      date: null,
    },
  },
  //   10
  {
    id: 10,
    img: null,
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов',
    author: ['Адитья Бхаргава'],
    year: 2019,
    rank: 4,
    booking: {
      status: false,
      date: null,
    },
  },
];
