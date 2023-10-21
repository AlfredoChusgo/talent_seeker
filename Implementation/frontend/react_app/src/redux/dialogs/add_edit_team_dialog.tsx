import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import i18next from 'i18next';
import { DialogActions, DialogContent, IconButton, TextField } from '@mui/material';
import store, { RootState } from '../store/store';
import { addTeam, editTeam } from '../features/team_detail/team_detail_slice';
import { useSelector } from 'react-redux';
import { showHideteamDialog, updateAddEditTeamDialogConfig } from '../features/global_dialog/global_dialog_slice';

export function AddEditTeamDialog() {
  const { addEditTeamDialogConfig } = useSelector((state: RootState) => state.dialog);

  const handleSave = () => {
    hideDialog();
    if(addEditTeamDialogConfig.isAdd){
      store.dispatch(addTeam({ teamName: addEditTeamDialogConfig.teamItem.name }));      
    }else{
      store.dispatch(editTeam({ teamItemUpdated: addEditTeamDialogConfig.teamItem }));      
    }
    
  };

  const hideDialog = () => {
    store.dispatch(showHideteamDialog({show:false}));
  }

  const dialogTitle = addEditTeamDialogConfig.isAdd ? i18next.t('teams.createNewTeam') : i18next.t('teams.editTeam');
  const performActionButtonText = addEditTeamDialogConfig.isAdd ? i18next.t('common.create') : i18next.t('common.edit');
  return (
    <Dialog open={addEditTeamDialogConfig.show}>
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
        <TextField id="outlined-basic" label={i18next.t('teams.labelNewTeamName')} variant="outlined"
          value={addEditTeamDialogConfig.teamItem.name} onChange={(e) => store.dispatch(updateAddEditTeamDialogConfig({
            ...addEditTeamDialogConfig, 
            teamItem:{...addEditTeamDialogConfig.teamItem, name:e.target.value}
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


