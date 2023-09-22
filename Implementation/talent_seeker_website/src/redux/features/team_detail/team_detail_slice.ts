import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TeamItem } from '../../../data/models';
import { teamsRepository } from '../../../data/repositories/in_memory_repositories';

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
    const teamResponse = await teamsRepository.getById(teamId);
    return teamResponse;
  } catch (error) {
    throw error;
  }
});

export const removeResourceFromTeam = createAsyncThunk<TeamItem, { resourceId: string, teamId: string }>('teamDetail/removeResourceFromTeam', async ({ resourceId, teamId }) => {
  try {
    const teamResponse = await teamsRepository.getById(teamId);
    let resourcesUpdated = [...teamResponse.resources.filter(resource => resource.id != resourceId)];
    let teamUpdated : TeamItem = {...teamResponse , resources: resourcesUpdated};
    await teamsRepository.update(teamUpdated);
    return await teamsRepository.getById(teamId);
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

    builder.addCase(removeResourceFromTeam.pending, (state) => {
      state.loading = true;
    })
      .addCase(removeResourceFromTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teamDetail = action.payload;
      })
      .addCase(removeResourceFromTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      });
  }
});

//export const { increment, decrement } = searchHomeSlice.actions;
// export const { applyFilters } = resourceListSlice.actions;
export default teamDetailSlice.reducer;
