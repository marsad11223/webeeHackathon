import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, CategoryState } from '../interfaces';

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const { id, name } = action.payload;
      const category = state.categories.find((category) => category.id === id);
      if (category) {
        category.name = name;
      }
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      const categoryId = action.payload;
      state.categories = state.categories.filter((category) => category.id !== categoryId);
    },
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  createCategory,
  updateCategory,
  deleteCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
