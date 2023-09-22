import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SearchHomeItem, SearchItem } from '../../../data/models';

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

export const fetchTeamItems = createAsyncThunk('searchTeam/fetchItems', async () => {
    try {
      const response = await axios.get("fake_data/search_teams_data.json");
      return response.data;
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
