export interface RootState {
  category: {
    categories: Category[];
    loading: boolean;
    error: string | null;
  };
}

export interface Category {
  id: string;
  name: string;
  [key: string]: Date | string | boolean | number;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}
