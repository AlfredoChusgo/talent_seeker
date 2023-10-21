import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import i18next from 'i18next';
import { DialogActions, DialogContent, IconButton, TextField } from '@mui/material';
import store, { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { showHideSkillDialog,  updateAddEditSkillDialogConfig } from '../features/global_dialog/global_dialog_slice';
import { addSkill, editSkill } from '../features/skills/skills_slice';

export function AddEditSkillDialog() {
  const { addEditSkillDialogConfig } = useSelector((state: RootState) => state.dialog);

  const handleSave = () => {
    hideDialog();
    if(addEditSkillDialogConfig.isAdd){
      store.dispatch(addSkill({ name: addEditSkillDialogConfig.skillItem.name }));      
    }else{
      store.dispatch(editSkill({ itemUpdated: addEditSkillDialogConfig.skillItem }));
    }
    
  };

  const hideDialog = () => {
    store.dispatch(showHideSkillDialog({show:false}));
  }

  const dialogTitle = addEditSkillDialogConfig.isAdd ? i18next.t('skills.createNew') : i18next.t('skills.edit');
  const performActionButtonText = addEditSkillDialogConfig.isAdd ? i18next.t('common.create') : i18next.t('common.edit');
  return (
    <Dialog open={addEditSkillDialogConfig.show}>
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
        <TextField id="outlined-basic" label={i18next.t('skills.labelNewName')} variant="outlined"
          value={addEditSkillDialogConfig.skillItem.name} onChange={(e) => store.dispatch(updateAddEditSkillDialogConfig({
            ...addEditSkillDialogConfig, 
            skillItem:{...addEditSkillDialogConfig.skillItem, name:e.target.value}
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


