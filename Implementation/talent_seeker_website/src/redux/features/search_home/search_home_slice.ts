import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit';
import { PromiseState, SearchHomeItem } from '../../../data/models';
import { searchRepository } from '../../../data/repositories/in_memory_repositories';
import i18next from 'i18next';
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
        state.error = action.error.message || i18next.t('error.common.anErrorOcurred');
      });
  }
});

export default searchHomeSlice.reducer;
