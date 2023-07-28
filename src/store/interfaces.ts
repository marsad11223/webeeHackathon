export interface RootState {
  category: {
    categories: Category[];
    loading: boolean;
    error: string | null;
  };
}

export interface Attribute {
  id: string;
  name: string;
  type: string;
}

export interface Category {
  id: string;
  name: string;
  attributes: Attribute[];
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}
