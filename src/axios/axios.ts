/* eslint-disable import/no-default-export */

import axios from 'axios';

export const AxiosBooks = axios.create({
  baseURL: 'https://strapi.cleverland.by',
});

export const AxiosAuth = axios.create({
  baseURL: 'https://strapi.cleverland.by',
});
