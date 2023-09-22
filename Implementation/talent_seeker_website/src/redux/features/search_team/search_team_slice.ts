import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {  SearchItem } from '../../../data/models';
import { searchRepository } from '../../../data/repositories/in_memory_repositories';

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
      //const response = await axios.get("fake_data/search_teams_data.json");
      const response = await searchRepository.getAllTeams();
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
        state.error = action.error.message || 'An error occurred.';
      });
  }
});

export default searchTeamSlice.reducer;
