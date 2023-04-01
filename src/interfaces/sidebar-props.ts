import { IBooks } from './books-fetch';
import { Category } from './category-state';

export interface SidebarProps {
  toggleCategories: (e: React.MouseEvent) => void;
  isOpenCategories: boolean;
  pathnameValidation: () => boolean;
  categories: Category[];
  changeReduxCategory: (c: string, p: string) => void;
  booksInCategories: (category: Category) => IBooks[];
}
