import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PromiseState, SearchHomeItem } from '../../../data/models';
import { searchRepository } from '../../../data/repositories/in_memory_repositories';
interface SearchHomeState {
  items: SearchHomeItem[];
  loading : PromiseState;
  error : string;
}

const initialState: SearchHomeState = {
    items: [],
    loading: PromiseState.IDLE,
    error : "",
};

export const fetchItems = createAsyncThunk('searchHome/fetchItems', async () => {
    try {
      // const response = await axios.get("fake_data/search_home_data.json");
      const response = await searchRepository.getAllResources();
      return response;
    } catch (error) {
      throw error;
    }
  });
  
const searchHomeSlice = createSlice({
  name: 'searchHome',
  initialState,
  reducers: 
  {
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchItems.pending, (state) => {
        state.loading = PromiseState.PENDING;
      })
      .addCase(fetchItems.fulfilled, (state,action) => {
        state.loading = PromiseState.SUCCEDED;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = PromiseState.FAILED;
        state.error = action.error.message || 'An error occurred.';
      });
  }
});

export default searchHomeSlice.reducer;
