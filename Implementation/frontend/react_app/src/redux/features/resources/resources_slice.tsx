import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ResourceCreateCommand, ResourceItem, ResourceUpdateCommand, SnackbarSeverity } from '../../../data/models';
import i18next from 'i18next';
import repositories from '../../../data/repositories/main_repo';
import { showSnackbar } from '../global_snackbar/global_snackbar_slice';
interface ResourcesState {
  items: ResourceItem[];
  isLoading: boolean;
  error: string;
}

const initialState: ResourcesState = {
  items: [],
  isLoading: false,
  error: "",
};

export const fetchItems = createAsyncThunk('resources/fetchItems', async () => {
  try {
    const response = await repositories.resourcesRepository.getAll();
    return response;
  } catch (error) {
    throw error;
  }
});

export const addResource = createAsyncThunk<ResourceItem, { item: ResourceItem }>('resources/addResource', async ({ item }, thunkAPI) => {
  try {
    const newResource: ResourceCreateCommand = {
      name: item.name,
      lastName: item.lastName,
      birthDate: item.birthDate.toISOString(),
      biography: item.biography,
      locality: item.locality,
      occupation: item.occupation,
      role: item.role.id,
      skills: item.skills.map(e=>({skill:e.skill.id,skillLevel:e.skillLevel})),
    };
    const createdItem = await repositories.resourcesRepository.create(newResource);

    thunkAPI.dispatch(showSnackbar({ message: i18next.t('resources.created'), severity: SnackbarSeverity.Success }));
    thunkAPI.dispatch(fetchItems());
    return await repositories.resourcesRepository.getById(createdItem.id);
  } catch (error: any) {
    const errorMessage = error ? error.message : i18next.t('error.common.anErrorOcurred');
    thunkAPI.dispatch(showSnackbar({ message: errorMessage, severity: SnackbarSeverity.Error, }));
    throw error;
  }
});

export const removeResource = createAsyncThunk<void, { roleId: string }>('resources/remove', async ({ roleId }, thunkAPI) => {
  try {
    await repositories.resourcesRepository.delete(roleId);
    thunkAPI.dispatch(showSnackbar({ message: i18next.t('resources.removed'), severity: SnackbarSeverity.Info, }));
    thunkAPI.dispatch(fetchItems());
  } catch (error: any) {
    const errorMessage = error ? error.message : i18next.t('error.common.anErrorOcurred');
    thunkAPI.dispatch(showSnackbar({ message: errorMessage, severity: SnackbarSeverity.Error, }));
    throw error;
  }
});

export const editResource = createAsyncThunk<ResourceItem, { itemUpdated: ResourceItem }>('resources/editResource', async ({ itemUpdated }, thunkAPI) => {
  try {

    const updatedResource: ResourceUpdateCommand = {
      id: itemUpdated.id,
      name: itemUpdated.name,
      lastName: itemUpdated.lastName,
      birthDate: itemUpdated.birthDate.toISOString(),
      biography: itemUpdated.biography,
      locality: itemUpdated.locality,
      occupation: itemUpdated.occupation,
      role: itemUpdated.role.id,
      skills: itemUpdated.skills.map(e=>({skill:e.skill.id,skillLevel:e.skillLevel})),
    };

    await repositories.resourcesRepository.update(updatedResource);

    thunkAPI.dispatch(showSnackbar({ message: i18next.t('resources.updated'), severity: SnackbarSeverity.Success }));
    thunkAPI.dispatch(fetchItems());
    return await repositories.resourcesRepository.getById(itemUpdated.id);
  } catch (error: any) {
    const errorMessage = error ? error.message : i18next.t('error.common.anErrorOcurred');
    thunkAPI.dispatch(showSnackbar({ message: errorMessage, severity: SnackbarSeverity.Error, }));
    throw error;
  }
});

const resourcesSlice = createSlice({
  name: 'resources',
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

    builder.addCase(removeResource.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(removeResource.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(removeResource.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || i18next.t('error.common.anErrorOcurred');
      });

    builder.addCase(addResource.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(addResource.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addResource.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || i18next.t('error.common.anErrorOcurred');
      });

    builder.addCase(editResource.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(editResource.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editResource.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || i18next.t('error.common.anErrorOcurred');
      });
  }
});

export default resourcesSlice.reducer;
