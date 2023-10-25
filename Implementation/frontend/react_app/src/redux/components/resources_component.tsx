import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';
import { ResourceItem } from '../../data/models';
import { ResourceComponentProps, ResourceListComponentProps } from '../../data/component_props';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { Container, IconButton, Stack } from '@mui/material';
import i18next from 'i18next';
import store from '../store/store';
import { removeResource } from '../features/resources/resources_slice';
import { loadResourceDialogAutoCompleteValues, showResourceDialog, updateAddEditResourceDialogConfig } from '../features/global_dialog/global_dialog_slice';

export default function ResourcesComponent({ resources }: ResourceComponentProps) {

    const buildCard = (resource: ResourceItem) => {
        return (
            <List sx={{ width: '90%', bgcolor: 'background.paper' }}>
                <ListItem key={resource.id} alignItems="center" secondaryAction={
                    <Stack direction="row" spacing={1}>
                        <IconButton edge="end" aria-label="comments">
                            <Edit onClick={() => {
                                // store.dispatch(updateAddEditResourceDialogConfig({
                                //     isAdd: false,
                                //     show: true,
                                //     roleItem: role
                                // }));
                                //store.dispatch(loadResourceDialogAutoCompleteValues({isAdd:false}));
                                store.dispatch(updateAddEditResourceDialogConfig({isAdd:false,resourceItem:resource,isLoading:false,
                                show:true,availableRoles:[],availableSkills:[]}));
                                store.dispatch(loadResourceDialogAutoCompleteValues());
                            }} />
                        </IconButton>
                        <IconButton edge="end" aria-label="comments">
                            <DeleteForeverIcon onClick={() => {
                                store.dispatch(removeResource({ roleId: resource.id }));
                            }} />
                        </IconButton>

                    </Stack>

                }>
                    <ListItemText
                        primary={`${resource.name}`}
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
        );
    }

    const itemsUI = resources.map((e: ResourceItem) => {
        return (
            <Grid container justifyContent="center" alignItems="center">
                {buildCard(e)}
            </Grid>

        );
    });

    if (resources.length > 0) {
        return (<Container>
            {itemsUI}
        </Container>);
    }
    else {
        return (
            <Grid container justifyContent="center" alignItems="center" direction="column" spacing={0}>
                <Grid xs={10}>
                    <Typography variant="h5">{i18next.t('common.noResults')}</Typography>
                </Grid>
            </Grid>
        );
    }
}
