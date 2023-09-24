import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import i18next from 'i18next';
import { DialogActions, DialogContent, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import store, { RootState } from '../store/store';
import { addTeam } from '../features/team_detail/team_detail_slice';
import { useSelector } from 'react-redux';
import { hideAddTeamDialog } from '../features/global_dialog/global_dialog_slice';

export function AddTeamDialog() {
  const { showAddTeamDialog } = useSelector((state: RootState) => state.dialog);
  const [dialogTeamName, setDialogTeamName] = useState<string>("");

  const handleSave = () => {
    hideDialog();
    store.dispatch(addTeam({ teamName: dialogTeamName }));
  };

  const hideDialog = () => {
    store.dispatch(hideAddTeamDialog());
  }

  return (
    <Dialog open={showAddTeamDialog}>
      <DialogTitle>{i18next.t('teams.createNewTeam')}</DialogTitle>
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
          value={dialogTeamName} onChange={(e) => setDialogTeamName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSave}>
          {i18next.t('common.create')}
        </Button>

        <Button autoFocus onClick={hideDialog}>
          {i18next.t('common.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
