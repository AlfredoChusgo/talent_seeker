import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ResourceItem } from '../../../data/models';


interface ResourceListState {
  resourceList: ResourceItem[];
  loading : boolean;
  error : string;
}

const initialState: ResourceListState = {
    resourceList: [],
    loading: false,
    error : "",
};

export const fetchResourceItems = createAsyncThunk('resourcesList/fetchResourceItems', async () => {
    try {
      const response = await axios.get("fake_data/resources_data.json");
      return response.data;
    } catch (error) {
      throw error;
    }
  });

  
const resourceListSlice = createSlice({
  name: 'resourceList',
  initialState,
  reducers: 
  {
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchResourceItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResourceItems.fulfilled, (state,action) => {
        state.loading = false;
        state.resourceList = action.payload;
      })
      .addCase(fetchResourceItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      });
  }
});

//export const { increment, decrement } = searchHomeSlice.actions;
export default resourceListSlice.reducer;
