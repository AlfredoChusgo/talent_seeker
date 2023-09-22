// SnackbarComponent.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { RootState } from '../store/store';
import { hideSnackbar } from '../features/global_snackbar/global_snackbar_slice';
//import { SnackbarSeverity } from './path-to-snackbarSlice';
//import { hideSnackbar } from './path-to-snackbarSlice';

const SnackbarComponent: React.FC = () => {
  const dispatch = useDispatch();

  // Listen to snackbarSlice's state
  const snackbarState = useSelector((state: RootState) => state.snackbar); // Adjust based on your state structure

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar 
      open={snackbarState.open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={snackbarState.severity} sx={{ width: '100%' }}>
        {snackbarState.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
