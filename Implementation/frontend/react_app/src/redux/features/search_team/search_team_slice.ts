import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit';
import {  SearchItem } from '../../../data/models';
import repositories  from '../../../data/repositories/main_repo';
import i18next from 'i18next';

interface SearchTeamState {
  teams: SearchItem[];
  loading : boolean;
  error : string;
}

const initialState: SearchTeamState = {
    teams: [],
    loading: false,
    error : "",
};

export const fetchTeamItems = createAsyncThunk<SearchItem[]>('searchTeam/fetchItems', async ():Promise<SearchItem[]> => {
    try {
      const response = await repositories.searchRepository.getAllTeams();
      return response;
    } catch (error) {
      throw error;
    }
  });
  
const searchTeamSlice = createSlice({
  name: 'searchTeam',
  initialState,
  reducers: 
  {
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchTeamItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeamItems.fulfilled, (state,action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeamItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || i18next.t('error.common.anErrorOcurred');
      });
  }
});

export default searchTeamSlice.reducer;
