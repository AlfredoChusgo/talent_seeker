import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SnackbarSeverity } from '../../../data/models';


type SnackbarState = {
  message: string;
  severity: SnackbarSeverity;
  open: boolean;
};

const initialState: SnackbarState = {
  message: '',
  severity: SnackbarSeverity.Info,
  open: false,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<{ message: string; severity: SnackbarSeverity }>) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = true;
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.message = '';
      state.severity = SnackbarSeverity.Info;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
