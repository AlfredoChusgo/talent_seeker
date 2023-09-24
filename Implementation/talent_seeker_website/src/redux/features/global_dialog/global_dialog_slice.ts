import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SnackbarState = {
  showAddTeamDialog: boolean;
};

const initialState: SnackbarState = {
  showAddTeamDialog: false,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    showAddTeamDialog: (state, action: PayloadAction<void>) => {
        state.showAddTeamDialog = true;
    },
    hideAddTeamDialog: (state) => {
        state.showAddTeamDialog = false;
    },
  },
});

export const { showAddTeamDialog, hideAddTeamDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
