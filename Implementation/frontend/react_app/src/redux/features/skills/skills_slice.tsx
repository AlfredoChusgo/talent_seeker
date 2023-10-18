import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PromiseState, SearchHomeItem, SearchItem } from '../../../data/models';
import i18next from 'i18next';
import repositories  from '../../../data/repositories/main_repo';
interface SkillsState {
  items: SearchItem[];
  isLoading: boolean;
  error: string;
}

const initialState: SkillsState = {
  items: [],
  isLoading: false,
  error: "",
};

export const fetchItems = createAsyncThunk('skills/fetchItems', async () => {
  try {
    const response = await repositories.searchRepository.getAllResources();
    return response;
  } catch (error) {
    throw error;
  }
});

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers:
  {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || i18next.t('error.common.anErrorOcurred');
      });
  }
});

export default skillsSlice.reducer;
