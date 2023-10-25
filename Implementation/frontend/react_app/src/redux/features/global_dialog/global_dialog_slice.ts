import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResourceItem, RoleItem, SkillItem, SkillLevel, SkillResourceItem, SnackbarSeverity, TeamItem } from '../../../data/models';
import { ResourceHelper } from '../../../helpers/model_helper';
import repositories from '../../../data/repositories/main_repo';
import { showSnackbar } from '../global_snackbar/global_snackbar_slice';
import i18next from 'i18next';
type DialogState = {
  addEditTeamDialogConfig: AddEditTeamDialogConfig,
  showResourceDetailDialog: boolean,
  addEditSkillDialogConfig: AddEditSkillDialogConfig,
  addEditRoleDialogConfig: AddEditRoleDialogConfig,
  addEditResourceDialogConfig: AddEditResourceDialogConfig
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

interface AddEditRoleDialogConfig {
  isAdd: boolean
  show: boolean,
  roleItem: RoleItem
}

interface AddEditResourceDialogConfig extends ResourceAutoCompleteFields {
  isAdd: boolean
  show: boolean,
  resourceItem: ResourceItem,
  isLoading: boolean
}

interface ResourceAutoCompleteFields {
  availableRoles: RoleItem[],
  availableSkills: SkillResourceItem[],
}

const initialState: DialogState = {
  //showAddTeamDialog: false,
  addEditTeamDialogConfig: {
    isAdd: false,
    show: false,
    teamItem: { id: "", name: "", resources: [] }
  },
  showResourceDetailDialog: false,
  addEditSkillDialogConfig: {
    isAdd: false,
    show: false,
    skillItem: {
      id: "",
      name: ""
    }
  },
  addEditRoleDialogConfig: {
    isAdd: false,
    show: false,
    roleItem: {
      id: "",
      name: ""
    }
  },
  addEditResourceDialogConfig: {
    isAdd: false,
    show: false,
    isLoading: false,
    resourceItem: ResourceHelper.EmptyModel(),
    availableRoles: [],
    availableSkills: []
  }
};

//Resource

export const loadResourceDialogAutoCompleteValues = createAsyncThunk<ResourceAutoCompleteFields>('dialog/updateAddEditResourceDialogConfig',
  async ( _payload,thunkAPI) => {
    let roles: RoleItem[] = [];
    let skillResourcesItems: SkillResourceItem[] = [];
      try {
        roles = await repositories.rolesRepository.getAll();
        let skills = await repositories.skillsRepository.getAll();
        skills.forEach((skill)=>{
          skillResourcesItems.push({skill:skill,skillLevel:SkillLevel.Beginner});  
          skillResourcesItems.push({skill:skill,skillLevel:SkillLevel.Novice});  
          skillResourcesItems.push({skill:skill,skillLevel:SkillLevel.Intermediate});  
          skillResourcesItems.push({skill:skill,skillLevel:SkillLevel.Proficient});  
          skillResourcesItems.push({skill:skill,skillLevel:SkillLevel.Expert});           
        });
      } catch (error: any) {
        const errorMessage = error ? error.message : i18next.t('error.common.anErrorOcurred');
        thunkAPI.dispatch(showSnackbar({ message: errorMessage, severity: SnackbarSeverity.Error, }));
        throw error;
      }
    return {
      availableRoles: roles,
      availableSkills: skillResourcesItems
    };
  });

//Resource


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

    //Role
    updateAddEditRoleDialogConfig: (state, action: PayloadAction<AddEditRoleDialogConfig>) => {
      state.addEditRoleDialogConfig = action.payload;
    },
    showHideRoleDialog: (state, action: PayloadAction<{ show: boolean }>) => {
      state.addEditRoleDialogConfig.show = action.payload.show;
    },
    //Role

    //Resources
    updateAddEditResourceDialogConfig: (state, action: PayloadAction<AddEditResourceDialogConfig>) => {
      state.addEditResourceDialogConfig = action.payload;
    },
    showResourceDialog: (state) => {
      state.addEditResourceDialogConfig.show = true;
    },
    hideResourceDialog: (state) => {
      state.addEditResourceDialogConfig.show = false;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(loadResourceDialogAutoCompleteValues.pending, (state) => {
      state.addEditResourceDialogConfig.isLoading = true;
    })
      .addCase(loadResourceDialogAutoCompleteValues.fulfilled, (state, action) => {
        state.addEditResourceDialogConfig.isLoading = false;
        state.addEditResourceDialogConfig.availableRoles = action.payload.availableRoles;
        state.addEditResourceDialogConfig.availableSkills = action.payload.availableSkills;
      })
      .addCase(loadResourceDialogAutoCompleteValues.rejected, (state, action) => {
        state.addEditResourceDialogConfig.isLoading = false;
        
      });
  }
});

export const { updateAddEditTeamDialogConfig, showHideteamDialog, dispatchShowResourceDetailDialog,
  updateAddEditSkillDialogConfig, showHideSkillDialog, updateAddEditRoleDialogConfig, showHideRoleDialog,
  updateAddEditResourceDialogConfig, hideResourceDialog,showResourceDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
