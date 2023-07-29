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
export interface Item {
  id: string,
  [key: string]: string | number | boolean | Date;
}
export interface Category {
  id: string;
  name: string;
  titleField: string;
  attributes: Attribute[];
  items: Item[];
}
export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export interface Type {
  [key: string]: string;
}
