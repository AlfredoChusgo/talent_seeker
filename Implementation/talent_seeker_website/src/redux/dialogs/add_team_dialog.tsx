import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import i18next from 'i18next';
import { DialogActions, DialogContent, IconButton, TextField } from '@mui/material';
import { AddTeamDialogProps } from '../../data/component_props';

export function AddTeamDialog(props: AddTeamDialogProps) {
  const { setOpen, onSave: onClose, selectedValue, setSelectedValue, open } = props;

  const handleSave = () => {
    setOpen(false);
    onClose(selectedValue);
  };

  return (
    // <Dialog onClose={handleSave} open={open}>
    <Dialog  open={open}>
      <DialogTitle>{i18next.t('teams.createNewTeam')}</DialogTitle>
      <IconButton
          aria-label="close"
          onClick={()=>{
            setOpen(false);
          }}
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
        value={selectedValue} onChange={(e)=> setSelectedValue(e.target.value)}
         />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave}>
            {i18next.t('common.create')}
          </Button>
        </DialogActions>
    </Dialog>
  );
}
