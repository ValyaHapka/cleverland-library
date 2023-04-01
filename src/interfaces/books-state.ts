import { IBooks } from './books-fetch';

export enum Status {
  EMPTY = '',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

export interface BooksState {
  status: Status;
  baseItems: IBooks[];
  items: IBooks[];
  searchValue: string;
  sortTypeDesc: boolean;
}
