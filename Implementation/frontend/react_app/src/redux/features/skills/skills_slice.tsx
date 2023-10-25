import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SkillCreateCommand, SkillItem, SkillUpdateCommand, SnackbarSeverity } from '../../../data/models';
import i18next from 'i18next';
import repositories from '../../../data/repositories/main_repo';
import { showSnackbar } from '../global_snackbar/global_snackbar_slice';
interface SkillsState {
  items: SkillItem[];
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
    const response = await repositories.skillsRepository.getAll();
    return response;
  } catch (error) {
    throw error;
  }
});

export const addSkill = createAsyncThunk<SkillItem, { name: string }>('skills/addSKill', async ({ name }, thunkAPI) => {
  try {
    const newSkill: SkillCreateCommand = {
      name: name,
    };
    const createdItem = await repositories.skillsRepository.create(newSkill);

    thunkAPI.dispatch(showSnackbar({ message: i18next.t('skills.created'), severity: SnackbarSeverity.Success }));
    thunkAPI.dispatch(fetchItems());
    return await repositories.skillsRepository.getById(createdItem.id);
  } catch (error: any) {
    const errorMessage = error ? error.message : i18next.t('error.common.anErrorOcurred');
    thunkAPI.dispatch(showSnackbar({ message: errorMessage, severity: SnackbarSeverity.Error, }));
    throw error;
  }
});

export const removeSkill = createAsyncThunk<void, { skillId: string }>('skills/remove', async ({ skillId }, thunkAPI) => {
  try {
    await repositories.skillsRepository.delete(skillId);
    thunkAPI.dispatch(showSnackbar({ message: i18next.t('skills.removed'), severity: SnackbarSeverity.Info, }));
    thunkAPI.dispatch(fetchItems());
  } catch (error: any) {
    const errorMessage = error ? error.message : i18next.t('error.common.anErrorOcurred');
    thunkAPI.dispatch(showSnackbar({ message: errorMessage, severity: SnackbarSeverity.Error, }));
    throw error;
  }
});

export const editSkill = createAsyncThunk<SkillItem, { itemUpdated: SkillUpdateCommand }>('skills/editSkill', async ({ itemUpdated }, thunkAPI) => {
  try {

    await repositories.skillsRepository.update(itemUpdated);

    thunkAPI.dispatch(showSnackbar({ message: i18next.t('skills.updated'), severity: SnackbarSeverity.Success }));
    thunkAPI.dispatch(fetchItems());
    return await repositories.skillsRepository.getById(itemUpdated.id);
  } catch (error: any) {
    const errorMessage = error ? error.message : i18next.t('error.common.anErrorOcurred');
    thunkAPI.dispatch(showSnackbar({ message: errorMessage, severity: SnackbarSeverity.Error, }));
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

    builder.addCase(removeSkill.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(removeSkill.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(removeSkill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || i18next.t('error.common.anErrorOcurred');
      });

    builder.addCase(addSkill.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || i18next.t('error.common.anErrorOcurred');
      });

    builder.addCase(editSkill.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(editSkill.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editSkill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || i18next.t('error.common.anErrorOcurred');
      });
  }
});

export default skillsSlice.reducer;
