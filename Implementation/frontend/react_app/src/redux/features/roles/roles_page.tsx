import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import store, { RootState, useAppDispatch } from '../../store/store';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Paper,  Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import i18next from 'i18next';
import { updateAddEditRoleDialogConfig } from '../global_dialog/global_dialog_slice';
import RolesComponent from '../../components/roles_component';
import { fetchItems } from './roles_slice';
export default function RolesPage() {
    const dispatch = useAppDispatch;

    useEffect(() => {        
        store.dispatch(fetchItems());
    }, [dispatch]);

    const { items } = useSelector((state: RootState) => state.roles);

    return <Box sx={{ flexGrow: 1 }}>
        <Grid container direction="row" spacing={1} style={{ padding: '16px' }}>
            <Grid xs={12}>
                <Paper elevation={3}>
                    <Grid container direction="column" spacing={1}
                        justifyContent="center" >
                        <Button color="primary" aria-label="add" onClick={() => {
                            store.dispatch(updateAddEditRoleDialogConfig({
                                isAdd: true,
                                show: true,
                                roleItem: { id: "", name: ""}
                            }));
                        }}>
                            <Typography>
                                {i18next.t('roles.createNew')}
                                <AddIcon />
                            </Typography>

                        </Button>
                        <RolesComponent roles={items} />
                    </Grid>

                </Paper>

            </Grid>

        </Grid>

    </Box>;
}
