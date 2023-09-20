// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import searchHomeReducer from '../features/search_home/search_home_slice';
import { useDispatch } from 'react-redux'
const store = configureStore({
  reducer: {
    searchHome: searchHomeReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;
