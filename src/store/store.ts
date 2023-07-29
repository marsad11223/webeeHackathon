import { combineReducers, createStore } from '@reduxjs/toolkit';
import categoryReducer from './reducers/categoryReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
  category: categoryReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


let store = createStore(persistedReducer)
let persistor = persistStore(store)

export default store;
export { persistor };
export type AppDispatch = typeof store.dispatch

