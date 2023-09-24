// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import searchHomeReducer from '../features/search_home/search_home_slice';
import resourceListReducer from '../features/resource_list/resource_list_slice';
import searchTeamReducer from '../features/search_team/search_team_slice';
import teamDetailReducer from '../features/team_detail/team_detail_slice';
import snackbarReducer from '../features/global_snackbar/global_snackbar_slice.ts';
import dialogReducer from '../features/global_dialog/global_dialog_slice.ts';
import { useDispatch } from 'react-redux'
const store = configureStore({
  reducer: {
    searchHome: searchHomeReducer,
    resourceList: resourceListReducer,
    searchTeam : searchTeamReducer,
    teamDetail : teamDetailReducer,
    snackbar : snackbarReducer,
    dialog: dialogReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;
