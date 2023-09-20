import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

enum PromiseState{
    IDLE = "idle",
    PENDING = 'pending',
    SUCCEDED = 'succeeded',
    FAILED = 'failed',
}

interface SearchHomeItem {
    id: string;
    displayName : string;
    groupId: string;
    groupDisplayName : string;
}

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

// Define an asynchronous thunk action using createAsyncThunk
export const fetchItems = createAsyncThunk('searchHome/fetchItems', async () => {
    // Simulate a delay of 2 seconds (2000 milliseconds) before resolving
    return await new Promise<SearchHomeItem[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "23s46",
            displayName : "Value1",
            groupId: "23ojofa",
            groupDisplayName : "Group1",
          },
          {
            id: "23s461",
            displayName : "Value2",
            groupId: "23ojof23a",
            groupDisplayName : "Group2",
          }
        ]);
      }, 2000);
    });
  });
  
const searchHomeSlice = createSlice({
  name: 'searchHome',
  initialState,
  reducers: 
  {
    // refreshData: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
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

//export const { increment, decrement } = searchHomeSlice.actions;
export default searchHomeSlice.reducer;
