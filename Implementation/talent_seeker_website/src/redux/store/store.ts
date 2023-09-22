// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import searchHomeReducer from '../features/search_home/search_home_slice';
import resourceListReducer from '../features/resource_list/resource_list_slice';
import searchTeamReducer from '../features/team_builder/search_team_slice';
import { useDispatch } from 'react-redux'
const store = configureStore({
  reducer: {
    searchHome: searchHomeReducer,
    resourceList: resourceListReducer,
    searchTeam : searchTeamReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;
