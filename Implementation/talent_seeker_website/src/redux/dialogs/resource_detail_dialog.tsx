import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import i18next from 'i18next';
import { DialogActions, DialogContent, IconButton, TextField } from '@mui/material';
import store, { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { dispatchShowResourceDetailDialog } from '../features/global_dialog/global_dialog_slice';
import ResourceDetailComponent from '../components/resource_detail_component';

export function ResourceDetailDialog() {
  const { showResourceDetailDialog } = useSelector((state: RootState) => state.dialog);


  const hideDialog = () => {
    store.dispatch(dispatchShowResourceDetailDialog({show:false}));
  }

  const dialogTitle =  i18next.t('resources.resourceDetail') ;
  return (
    <Dialog open={showResourceDetailDialog} fullWidth={true}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={hideDialog}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <ResourceDetailComponent></ResourceDetailComponent>
      </DialogContent>
      <DialogActions>

        <Button autoFocus onClick={hideDialog}>
          {i18next.t('common.okay')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}


