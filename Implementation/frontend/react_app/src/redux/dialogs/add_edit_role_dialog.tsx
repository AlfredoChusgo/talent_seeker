import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import i18next from 'i18next';
import { DialogActions, DialogContent, IconButton, TextField } from '@mui/material';
import store, { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { showHideRoleDialog,  updateAddEditRoleDialogConfig } from '../features/global_dialog/global_dialog_slice';
import { addRole, editRole } from '../features/roles/roles_slice';

export function AddEditRoleDialog() {
  const { addEditRoleDialogConfig } = useSelector((state: RootState) => state.dialog);

  const handleSave = () => {
    hideDialog();
    if(addEditRoleDialogConfig.isAdd){
      store.dispatch(addRole({ name: addEditRoleDialogConfig.roleItem.name }));      
    }else{
      store.dispatch(editRole({ itemUpdated: addEditRoleDialogConfig.roleItem }));
    }
    
  };

  const hideDialog = () => {
    store.dispatch(showHideRoleDialog({show:false}));
  }

  const dialogTitle = addEditRoleDialogConfig.isAdd ? i18next.t('roles.createNew') : i18next.t('roles.edit');
  const performActionButtonText = addEditRoleDialogConfig.isAdd ? i18next.t('common.create') : i18next.t('common.edit');
  return (
    <Dialog open={addEditRoleDialogConfig.show}>
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
        <TextField id="outlined-basic" label={i18next.t('roles.labelNewName')} variant="outlined"
          value={addEditRoleDialogConfig.roleItem.name} onChange={(e) => store.dispatch(updateAddEditRoleDialogConfig({
            ...addEditRoleDialogConfig, 
            roleItem:{...addEditRoleDialogConfig.roleItem, name:e.target.value}
          }))}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSave}>
          {performActionButtonText}
        </Button>

        <Button autoFocus onClick={hideDialog}>
          {i18next.t('common.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}


