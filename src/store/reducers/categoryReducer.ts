import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Attribute, Category, CategoryState, Item } from '../interfaces';

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
      const newCategory = action.payload;
      if (!state.categories.some((category) => category.id === newCategory.id)) {
        state.categories.push(newCategory);
      }
    },
    updateCategory: (state, action: PayloadAction<{ id: string, key: keyof Category, value: any }>) => {
      const { id, key, value } = action.payload;
      const category = state.categories.find((category) => category.id === id);
      if (category) {
        category[key] = value;
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      const categoryId = action.payload;
      state.categories = state.categories.filter((category) => category.id !== categoryId);
    },
    addAttribute: (state, action: PayloadAction<{ categoryId: string, attribute: Attribute }>) => {
      const { categoryId, attribute } = action.payload;
      const categoryIndex = state.categories.findIndex((category) => category.id === categoryId);
      if (categoryIndex >= 0) {
        const category = state.categories[categoryIndex];
        const attributes = [...category.attributes, attribute];
        state.categories[categoryIndex] = { ...category, attributes };
      }
    },
    deleteAttribute: (state, action: PayloadAction<{ categoryId: string, attributeId: string }>) => {
      const { categoryId, attributeId } = action.payload;
      const categoryIndex = state.categories.findIndex((category) => category.id === categoryId);
      if (categoryIndex >= 0) {
        const category = state.categories[categoryIndex];

        let name = ''
        const attributes = category.attributes.filter((attribute) => {
          if (attribute.id !== attributeId) {
            return attribute
          } else {
            name = attribute.name
          }
        });

        state.categories[categoryIndex].items.forEach(item => {
          if (item.hasOwnProperty(name)) {
            delete item[name];
          }
        });
        state.categories[categoryIndex] = { ...category, attributes };
      }

    },
    updateAttribute: (
      state,
      action: PayloadAction<{ categoryId: string, attributeId: string, attributeKey: string, attributeValue: string }>
    ) => {
      const { categoryId, attributeId, attributeKey, attributeValue } = action.payload;

      const categoryIndex = state.categories.findIndex((category) => category.id === categoryId);
      if (categoryIndex >= 0) {
        const category = state.categories[categoryIndex];
        const attributes = category.attributes.map((attribute) => {
          if (attribute.id === attributeId) {
            state.categories[categoryIndex].items.forEach(item => {
              if (item.hasOwnProperty(attribute.name)) {
                item[attributeValue] = item[attribute.name];
                delete item[attribute.name];
              }
            });
            return { ...attribute, [attributeKey]: attributeValue };
          }
          return attribute;
        });
        state.categories[categoryIndex] = { ...category, attributes };
      }
    },
    addItem: (state, action: PayloadAction<{ categoryId: string, item: Item }>) => {
      const { categoryId, item } = action.payload;
      const categoryIndex = state.categories.findIndex((category) => category.id === categoryId);
      if (categoryIndex >= 0) {
        const category = state.categories[categoryIndex];
        const items = [...category.items, item];
        state.categories[categoryIndex] = { ...category, items };
      }
    },
    updateItem: (
      state,
      action: PayloadAction<{ categoryId: string, itemIndex: number, itemKey: string, itemValue: string | boolean | Date | number }>
    ) => {
      const { categoryId, itemKey, itemValue, itemIndex } = action.payload;
      const categoryIndex = state.categories.findIndex((category) => category.id === categoryId);
      if (categoryIndex >= 0) {
        const item = state.categories[categoryIndex].items[itemIndex];
        state.categories[categoryIndex].items[itemIndex] = { ...item, [itemKey]: itemValue };
      }
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
  addAttribute,
  deleteAttribute,
  updateAttribute,
  addItem,
  updateItem
} = categorySlice.actions;

export default categorySlice.reducer;
