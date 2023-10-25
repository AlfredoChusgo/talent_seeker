import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import i18next from 'i18next';
import { Autocomplete, Box, DialogActions, DialogContent, IconButton, TextField } from '@mui/material';
import store, { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { hideResourceDialog, loadResourceDialogAutoCompleteValues, updateAddEditResourceDialogConfig } from '../features/global_dialog/global_dialog_slice';
import { addResource, editResource } from '../features/resources/resources_slice';
import { ResourceItem, RoleItem, SkillItem, SkillResourceItem } from '../../data/models';
import { useEffect, useState } from 'react';

export function AddEditResourceDialog() {
  const { addEditResourceDialogConfig } = useSelector((state: RootState) => state.dialog);
  const [resourceItem, setResourceItem] = useState<ResourceItem>(addEditResourceDialogConfig.resourceItem);

  useEffect(() => {
    setResourceItem(addEditResourceDialogConfig.resourceItem);
  }, [addEditResourceDialogConfig.resourceItem]); 
  
  const handleSave = () => {
    if(valid()){
      hideDialog();
      if (addEditResourceDialogConfig.isAdd) {
        store.dispatch(addResource({item:{...resourceItem, birthDate:formatDateToISO(resourceItem.birthDate)}}));
      } else {
        store.dispatch(editResource({itemUpdated:{...resourceItem, birthDate:formatDateToISO(resourceItem.birthDate)}}));
      }
    }

  };

  const hideDialog = () => {
    store.dispatch(hideResourceDialog());
  }

  function valid():boolean {
    if(!validateDate(resourceItem.birthDate)){
      return false;
    }
    return true;
  }
  
  function validateDate(dateStr: string): boolean {
    // Define a regular expression pattern for the "dd/mm/yyyy" format
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  
    // Check if the input string matches the pattern
    const matches = dateStr.match(datePattern);
  
    if (matches) {
      // Extract day, month, and year from the matched groups
      const [, day, month, year] = matches.map(Number);
  
      // Create a Date object with the extracted values (months are 0-based)
      const date = new Date(year, month - 1, day);
  
      // Check if the date is valid
      return !isNaN(date.getTime());
    }
  
    // Return false for invalid or mismatched dates
    return false;
  }

  function formatDateToISO(dateStr: string): string  {
    if (validateDate(dateStr)) {
      // Split the date string and rearrange it in ISO format
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month}-${day}T00:00:00.000Z`;
    }
  
    // Return null for invalid or mismatched dates
    return "";
  }

  const dialogTitle = addEditResourceDialogConfig.isAdd ? i18next.t('resources.createNew') : i18next.t('resources.edit');
  const performActionButtonText = addEditResourceDialogConfig.isAdd ? i18next.t('common.create') : i18next.t('common.edit');
  return (
    <Dialog open={addEditResourceDialogConfig.show}>
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
        <Box mb={2}> {/* Add margin bottom */}
          <TextField
            id="outlined-basic"
            label={i18next.t('resources.labelNewName')}
            variant="outlined"
            value={resourceItem.name}
            // onChange={(e) => store.dispatch(updateAddEditResourceDialogConfig({
            //   ...addEditResourceDialogConfig,
            //   resourceItem: { ...addEditResourceDialogConfig.resourceItem, name: e.target.value }
            // }))}
            onChange={(e) => setResourceItem({...resourceItem, name:e.target.value})}
          />
        </Box>
        <Box mb={2}> {/* Add margin bottom */}
          <TextField
            id="outlined-basic"
            label={i18next.t('resources.lastName')}
            variant="outlined"
            value={resourceItem.lastName}
            onChange={(e) => setResourceItem({...resourceItem, lastName:e.target.value})}
          />
        </Box>
        <Box mb={2}> {/* Add margin bottom */}
          <TextField
            id="outlined-basic"
            label={i18next.t('resources.birthDate')}
            variant="outlined"
            value={resourceItem.birthDate}
            helperText={i18next.t("common.helperDate")}
            onChange={(e) => setResourceItem({...resourceItem, birthDate:e.target.value})} //todo validate
          />
        </Box>
        <Box mb={2}> {/* Add margin bottom */}
          <TextField
            id="outlined-basic"
            label={i18next.t('resources.locality')}
            variant="outlined"
            value={resourceItem.locality}
            onChange={(e) => setResourceItem({...resourceItem, locality:e.target.value})}
          />
        </Box>
        <Box mb={2}> {/* Add margin bottom */}
          <TextField
            id="outlined-basic"
            label={i18next.t('resources.biography')}
            variant="outlined"
            value={resourceItem.biography}
            onChange={(e) => setResourceItem({...resourceItem, biography:e.target.value})}
          />
        </Box>
        <Box mb={2}> {/* Add margin bottom */}
          <TextField
            id="outlined-basic"
            label={i18next.t('resources.occupation')}
            variant="outlined"
            value={resourceItem.occupation}
            onChange={(e) => setResourceItem({...resourceItem, occupation:e.target.value})}
          />
        </Box>
        <Box mb={2}> 
          <Autocomplete
            
            getOptionLabel={(option) => option.name}
            options={addEditResourceDialogConfig.availableRoles}
            value={resourceItem.role}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={i18next.t("common.role")} />}
            onChange={(event:any, newValue: RoleItem | null) => {
              if(newValue){
                setResourceItem({...resourceItem, role:newValue})};
              }              
            }
          />
        </Box>
        <Box mb={2}> 
          <Autocomplete
            multiple
            getOptionLabel={(option:SkillResourceItem) => `${option.skill.name} (${option.skillLevel})`}
            options={addEditResourceDialogConfig.availableSkills}
            value={resourceItem.skills}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={i18next.t("common.skills")} />}
            onChange={(event:any, newValue: SkillResourceItem[] | null) => {
              if(newValue){
                setResourceItem({...resourceItem, skills:newValue})};
              }              
            }
          />
        </Box>
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


