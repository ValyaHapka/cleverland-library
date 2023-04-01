import { FetchedBook } from './books-fetch';
import { Status } from './books-state';

export interface ActiveBookState {
  status: Status;
  book: FetchedBook | Record<string, never>;
}
