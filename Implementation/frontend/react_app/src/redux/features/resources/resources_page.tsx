import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import store, { RootState, useAppDispatch } from '../../store/store';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Paper, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import i18next from 'i18next';
import { loadResourceDialogAutoCompleteValues, showResourceDialog, updateAddEditResourceDialogConfig } from '../global_dialog/global_dialog_slice';
import { fetchItems } from './resources_slice';
import { ResourceHelper } from '../../../helpers/model_helper';
import ResourcesComponent from '../../components/resources_component';
export default function ResourcesPage() {
    const dispatch = useAppDispatch;

    useEffect(() => {
        store.dispatch(fetchItems());
    }, [dispatch]);

    const { items } = useSelector((state: RootState) => state.resources);

    return <Box sx={{ flexGrow: 1 }}>
        <Grid container direction="row" spacing={1} style={{ padding: '16px' }}>
            <Grid xs={12}>
                <Paper elevation={3}>
                    <Grid container direction="column" spacing={1}
                        justifyContent="center" >
                        <Button color="primary" aria-label="add" onClick={() => {

                            store.dispatch(updateAddEditResourceDialogConfig({
                                isAdd: true, resourceItem: ResourceHelper.EmptyModel(), isLoading: false,
                                show: true, availableRoles: [], availableSkills: []
                            }));
                            store.dispatch(loadResourceDialogAutoCompleteValues());
                        }}>
                            <Typography>
                                {i18next.t('resources.createNew')}
                                <AddIcon />
                            </Typography>

                        </Button>
                        <ResourcesComponent resources={items} />
                    </Grid>

                </Paper>

            </Grid>

        </Grid>

    </Box>;
}
