import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TeamItem } from '../../../data/models';

type DialogState = {
  addEditTeamDialogConfig: AddEditTeamDialogConfig
};

interface AddEditTeamDialogConfig
{
  isAdd: boolean
  show: boolean,
  teamItem: TeamItem
}



const initialState: DialogState = {
  //showAddTeamDialog: false,
  addEditTeamDialogConfig: {
    isAdd: false,
    show: false,
    teamItem: { id: "", name: "", resources: [] }
  }
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    updateAddEditTeamDialogConfig: (state, action: PayloadAction<AddEditTeamDialogConfig>) => {
      state.addEditTeamDialogConfig = action.payload;
    },
    teamDialog: (state, action: PayloadAction<{show:boolean}>) => {      
      state.addEditTeamDialogConfig.show = action.payload.show;
    },
  },
});

export const { updateAddEditTeamDialogConfig,teamDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
