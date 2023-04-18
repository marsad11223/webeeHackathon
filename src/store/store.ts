import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoryReducer from './reducers/categoryReducer';

const rootReducer = combineReducers({
  category: categoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch