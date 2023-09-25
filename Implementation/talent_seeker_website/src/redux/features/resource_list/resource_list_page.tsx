import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import store, { RootState, useAppDispatch } from '../../store/store';
import { fetchAllResourceItems } from './resource_list_slice';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import ResourceListComponent from '../../components/resourcec_list_component';
import { Paper } from '@mui/material';
import { showSnackbar } from '../global_snackbar/global_snackbar_slice';
import { SnackbarSeverity } from '../../../data/models';


export default function ResourceListPage() {
    const dispatch = useAppDispatch;
    const { resourceList, loading, error } = useSelector((state: RootState) => state.resourceList);

    useEffect(() => {
        store.dispatch(fetchAllResourceItems());
    }, [dispatch]);

    function handleOnClickInfo(resourceId:string): void{
        store.dispatch(showSnackbar({message:`Clicked Info ${resourceId}`,severity:SnackbarSeverity.Warning}));
        
    }

    return <Box sx={{ flexGrow: 0}}>
        <Paper elevation={2}>
            <Grid container direction="column" spacing={0} alignItems="center"
                justifyContent="center"  sx={{ padding: '16px' }} >
                <ResourceListComponent resourcesItems={resourceList} infoButtonConfiguration={{isEnabled:true , action : handleOnClickInfo }}
                addButtonConfiguration={{isEnabled : false , action : ()=>{} }} />
            </Grid>
        </Paper>
    </Box>;
}
