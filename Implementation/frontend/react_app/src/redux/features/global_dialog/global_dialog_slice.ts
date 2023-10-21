import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SkillItem, TeamItem } from '../../../data/models';

type DialogState = {
  addEditTeamDialogConfig: AddEditTeamDialogConfig,
  showResourceDetailDialog: boolean,
  addEditSkillDialogConfig : AddEditSkillDialogConfig
};

interface AddEditTeamDialogConfig {
  isAdd: boolean
  show: boolean,
  teamItem: TeamItem
}

interface AddEditSkillDialogConfig {
  isAdd: boolean
  show: boolean,
  skillItem: SkillItem
}



const initialState: DialogState = {
  //showAddTeamDialog: false,
  addEditTeamDialogConfig: {
    isAdd: false,
    show: false,
    teamItem: { id: "", name: "", resources: [] }
  },
  showResourceDetailDialog: false,
  addEditSkillDialogConfig : {
    isAdd:false,
    show:false,
    skillItem : {
      id : "",
      name : ""
    }
  }
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    //Team
    updateAddEditTeamDialogConfig: (state, action: PayloadAction<AddEditTeamDialogConfig>) => {
      state.addEditTeamDialogConfig = action.payload;
    },
    showHideteamDialog: (state, action: PayloadAction<{ show: boolean }>) => {
      state.addEditTeamDialogConfig.show = action.payload.show;
    },
    //Team
    dispatchShowResourceDetailDialog: (state, action: PayloadAction<{ show: boolean }>) => {
      state.showResourceDetailDialog = action.payload.show;
    },
    //Skill
    updateAddEditSkillDialogConfig: (state, action: PayloadAction<AddEditSkillDialogConfig>) => {
      state.addEditSkillDialogConfig = action.payload;
    },
    showHideSkillDialog: (state, action: PayloadAction<{ show: boolean }>) => {
      state.addEditSkillDialogConfig.show = action.payload.show;
    },
    //Skill
  },
});

export const { updateAddEditTeamDialogConfig, showHideteamDialog, dispatchShowResourceDetailDialog,
  updateAddEditSkillDialogConfig,showHideSkillDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
