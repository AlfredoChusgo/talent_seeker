import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import store, { RootState, useAppDispatch } from '../../store/store';
import { fetchAllResourceItems } from './resource_list_slice';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ResourceListComponent from '../../components/resourcec_list_component';
import { Paper } from '@mui/material';


export default function ResourceListPage() {
    const dispatch = useAppDispatch;
    const { resourceList, loading, error } = useSelector((state: RootState) => state.resourceList);

    useEffect(() => {
        store.dispatch(fetchAllResourceItems());
    }, [dispatch]);

    return <Box sx={{ flexGrow: 1 }}>
        <Paper elevation={2}>
            <Grid container direction="column" spacing={0} alignItems="center"
                justifyContent="center" >
                <ResourceListComponent resourcesItems={resourceList} />
            </Grid>
        </Paper>
    </Box>;
}
