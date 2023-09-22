import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SnackbarSeverity, TeamItem } from '../../../data/models';
import { resourcesRepository, teamsRepository } from '../../../data/repositories/in_memory_repositories';
import { showSnackbar } from '../global_snackbar/global_snackbar_slice.ts';
import { ErrorSharp } from '@mui/icons-material';

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

export const removeResourceFromTeam = createAsyncThunk<TeamItem, { resourceId: string, teamId: string }>('teamDetail/removeResourceFromTeam', async ({ resourceId, teamId }, thunkAPI) => {
  try {
    const teamResponse = await teamsRepository.getById(teamId);
    let resourcesUpdated = [...teamResponse.resources.filter(resource => resource.id != resourceId)];
    let teamUpdated: TeamItem = { ...teamResponse, resources: resourcesUpdated };
    await teamsRepository.update(teamUpdated);
    thunkAPI.dispatch(showSnackbar({ message: "Resource removed", severity: SnackbarSeverity.Error, }));
    return await teamsRepository.getById(teamId);
  } catch (error) {
    throw error;
  }
});

export const addResourceToTeam = createAsyncThunk<TeamItem, { resourceId: string, teamId: string }>('teamDetail/addResourceToTeam', async ({ resourceId, teamId }, thunkAPI) => {
  try {
    if (!teamId) {
      const errorMessage = "Please select a team first";
      thunkAPI.dispatch(showSnackbar({ message: errorMessage, severity: SnackbarSeverity.Error, }));
      throw new Error(errorMessage);
    }

    const teamResponse = await teamsRepository.getById(teamId);
    const isResourcecInTeam = teamResponse.resources.some(resource => resource.id === resourceId);

    if (isResourcecInTeam) {
      const errorMessage = "Resource is already in the team";
      thunkAPI.dispatch(showSnackbar({ message: errorMessage, severity: SnackbarSeverity.Error, }));
      throw new Error(errorMessage);
    }

    const resourceResponse = await resourcesRepository.getById(resourceId);
    if (!resourceResponse) {
      const errorMessage = "Resource does not exist";
      thunkAPI.dispatch(showSnackbar({ message: errorMessage, severity: SnackbarSeverity.Error, }));
      throw new Error(errorMessage);
    }

    let resourcesUpdated = [...teamResponse.resources, resourceResponse];
    let teamUpdated: TeamItem = { ...teamResponse, resources: resourcesUpdated };
    await teamsRepository.update(teamUpdated);

    thunkAPI.dispatch(showSnackbar({ message: "Resource added to the team", severity: SnackbarSeverity.Success, }));

    return await teamsRepository.getById(teamId);
  } catch (error) {
    throw error;
  }
});

export const removeTeam = createAsyncThunk<void, { teamId: string }>('teamDetail/removeTeam', async ({ teamId }, thunkAPI) => {
  try {
    await teamsRepository.delete(teamId);
    thunkAPI.dispatch(showSnackbar({ message: "Team removed", severity: SnackbarSeverity.Info, }));
  } catch (error: any) {
    const errorMessage = error ? error.message : "An error occurred";
    thunkAPI.dispatch(showSnackbar({ message: errorMessage, severity: SnackbarSeverity.Error, }));
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

    builder.addCase(addResourceToTeam.pending, (state) => {
      state.loading = true;
    })
      .addCase(addResourceToTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teamDetail = action.payload;

      })
      .addCase(addResourceToTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      });

    builder.addCase(removeTeam.pending, (state) => {
      state.loading = true;
    })
      .addCase(removeTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teamDetail = { id: "", name: "", resources: [] };
      })
      .addCase(removeTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      });
  }
});

export default teamDetailSlice.reducer;
