import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TeamItem } from '../../../data/models';


interface TeamDetailState {
  teamDetail: TeamItem;
  loading: boolean;
  error: string;
}

const initialState: TeamDetailState = {
  teamDetail: { id: "", name: "", resources: [] },
  loading: false,
  error: "",
};

export const fetchTeamDetail = createAsyncThunk<TeamItem, { teamId: string }>('teamDetail/fetchTeam', async ({ teamId }) => {
  try {
    const response = await axios.get("fake_data/teams_data.json");
    const teams : TeamItem[] = response.data;

    return teams.filter(team=> team.id == teamId)[0];
  } catch (error) {
    throw error;
  }
});


const teamDetailSlice = createSlice({
  name: 'teamDetail',
  initialState,
  reducers:
  {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeamDetail.pending, (state) => {
      state.loading = true;
    })
      .addCase(fetchTeamDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.teamDetail = action.payload;
      })
      .addCase(fetchTeamDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      });
  }
});

//export const { increment, decrement } = searchHomeSlice.actions;
// export const { applyFilters } = resourceListSlice.actions;
export default teamDetailSlice.reducer;
