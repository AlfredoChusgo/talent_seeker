import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RoleCreateCommand, RoleItem, RoleUpdateCommand, SnackbarSeverity } from '../../../data/models';
import i18next from 'i18next';
import repositories from '../../../data/repositories/main_repo';
import { showSnackbar } from '../global_snackbar/global_snackbar_slice';
interface RolesState {
  items: RoleItem[];
  isLoading: boolean;
  error: string;
}

const initialState: RolesState = {
  items: [],
  isLoading: false,
  error: "",
};

export const fetchItems = createAsyncThunk('roles/fetchItems', async () => {
  try {
    const response = await repositories.rolesRepository.getAll();
    return response;
  } catch (error) {
    throw error;
  }
});

export const addRole = createAsyncThunk<RoleItem, { name: string }>('roles/addSkill', async ({ name }, thunkAPI) => {
  try {
    const newRole: RoleCreateCommand = {
      name: name,
    };
    const createdItem = await repositories.rolesRepository.create(newRole);

    thunkAPI.dispatch(showSnackbar({ message: i18next.t('roles.created'), severity: SnackbarSeverity.Success }));
    thunkAPI.dispatch(fetchItems());
    return await repositories.rolesRepository.getById(createdItem.id);
  } catch (error: any) {
    const errorMessage = error ? error.message : i18next.t('error.common.anErrorOcurred');
    thunkAPI.dispatch(showSnackbar({ message: errorMessage, severity: SnackbarSeverity.Error, }));
    throw error;
  }
});

export const removeRole = createAsyncThunk<void, { roleId: string }>('roles/remove', async ({ roleId }, thunkAPI) => {
  try {
    await repositories.rolesRepository.delete(roleId);
    thunkAPI.dispatch(showSnackbar({ message: i18next.t('roles.removed'), severity: SnackbarSeverity.Info, }));
    thunkAPI.dispatch(fetchItems());
  } catch (error: any) {
    const errorMessage = error ? error.message : i18next.t('error.common.anErrorOcurred');
    thunkAPI.dispatch(showSnackbar({ message: errorMessage, severity: SnackbarSeverity.Error, }));
    throw error;
  }
});

export const editRole = createAsyncThunk<RoleItem, { itemUpdated: RoleUpdateCommand }>('roles/editRole', async ({ itemUpdated }, thunkAPI) => {
  try {

    await repositories.rolesRepository.update(itemUpdated);

    thunkAPI.dispatch(showSnackbar({ message: i18next.t('roles.updated'), severity: SnackbarSeverity.Success }));
    thunkAPI.dispatch(fetchItems());
    return await repositories.teamsRepository.getById(itemUpdated.id);
  } catch (error: any) {
    const errorMessage = error ? error.message : i18next.t('error.common.anErrorOcurred');
    thunkAPI.dispatch(showSnackbar({ message: errorMessage, severity: SnackbarSeverity.Error, }));
    throw error;
  }
});

const rolesSlice = createSlice({
  name: 'roles',
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

    builder.addCase(removeRole.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(removeRole.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(removeRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || i18next.t('error.common.anErrorOcurred');
      });

    builder.addCase(addRole.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(addRole.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || i18next.t('error.common.anErrorOcurred');
      });

    builder.addCase(editRole.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(editRole.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || i18next.t('error.common.anErrorOcurred');
      });
  }
});

export default rolesSlice.reducer;
