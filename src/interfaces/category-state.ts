import { Status } from './books-state';

export type Category = {
  id: number;
  path: string;
  name: string;
};
export type ActiveCategory = {
  name: string;
  path: string;
};
export interface CategoryState {
  statusCategories: Status;
  categories: Category[];
  activeCategory: ActiveCategory;
}
