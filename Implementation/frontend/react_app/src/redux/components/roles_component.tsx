import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';
import { RoleItem } from '../../data/models';
import { RoleListComponentProps } from '../../data/component_props';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { Container, IconButton, Stack } from '@mui/material';
import i18next from 'i18next';
import store from '../store/store';
import { removeRole } from '../features/roles/roles_slice';
import { updateAddEditRoleDialogConfig } from '../features/global_dialog/global_dialog_slice';

export default function RolesComponent({ roles }: RoleListComponentProps) {

    const buildCard = (role: RoleItem) => {
        return (
            <List sx={{ width: '90%', bgcolor: 'background.paper' }}>
                <ListItem key={role.id} alignItems="center" secondaryAction={
                    <Stack direction="row" spacing={1}>
                        <IconButton edge="end" aria-label="comments">
                            <Edit onClick={() => {
                                store.dispatch(updateAddEditRoleDialogConfig({
                                    isAdd: false,
                                    show: true,
                                    roleItem: role
                                }));
                            }} />
                        </IconButton>
                        <IconButton edge="end" aria-label="comments">
                            <DeleteForeverIcon onClick={() => {
                                store.dispatch(removeRole({ roleId: role.id }));
                            }} />
                        </IconButton>

                    </Stack>

                }>
                    <ListItemText
                        primary={`${role.name}`}
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
        );
    }

    const itemsUI = roles.map((e: RoleItem) => {
        return (
            <Grid container justifyContent="center" alignItems="center">
                {buildCard(e)}
            </Grid>

        );
    });

    if (roles.length > 0) {
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
