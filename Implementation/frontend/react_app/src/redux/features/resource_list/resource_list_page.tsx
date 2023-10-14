import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import store, { RootState, useAppDispatch } from '../../store/store';
import { applyFilters, fetchAllResourceItems } from './resource_list_slice';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import ResourceListComponent from '../../components/resource_list_component';
import { IconButton, Paper } from '@mui/material';
import { ResourceItem, SearchHomeItem } from '../../../data/models';
import { selectResource } from '../resource_detail/resource_detail_slice';
import { useNavigate } from 'react-router-dom';
import SearchResourceComponent from '../../components/search_resource_component';
import { dispatchShowResourceDetailDialog } from '../global_dialog/global_dialog_slice';

export default function ResourceListPage() {
    const dispatch = useAppDispatch;
    const navigate = useNavigate();
    const { resourceList, loading, error } = useSelector((state: RootState) => state.resourceList);

    useEffect(() => {
        store.dispatch(fetchAllResourceItems());
    }, [dispatch]);

    const [selectedValues, setSelectedValues] = useState<SearchHomeItem[]>([]);

    const handleAutocompleteChange = (event: any, newValue: SearchHomeItem[]) => {
        setSelectedValues(newValue);

        const rolesIds = newValue.filter(e => e.objectType === "role").map(e => e.id);
        const resourcesIds = newValue.filter(e => e.objectType === "resource").map(e => e.id);
        const skillsIds = newValue.filter(e => e.objectType === "skill").map(e => e.id);

        const filters = {
            resourceIds: resourcesIds,
            roleIds: rolesIds,
            skillIds: skillsIds
        }
        store.dispatch(applyFilters(filters));
        store.dispatch(fetchAllResourceItems());
    };

    //const dispatch = useAppDispatch;
    const { items } = useSelector((state: RootState) => state.searchHome);

    //addResourceToTeam
    function handleOnClickInfo(resource: ResourceItem): void {
        store.dispatch(selectResource(resource));
        store.dispatch(dispatchShowResourceDetailDialog({show:true}));

    }


    return <Grid xs  style={{padding:"16px"}}>
        <Paper elevation={1}>
            <Grid container direction="column"
                justifyContent="center"  spacing={1}>
                <Grid xs>
                    <SearchResourceComponent searchItems={items} selectedValues={selectedValues}
                        searchButtonConfiguration={{
                            isEnabled: false,
                            searchButtonComponent: <IconButton
                            >
                            </IconButton>
                        }}
                        handleAutoCompleteChange={handleAutocompleteChange}
                    />
                </Grid>
                <ResourceListComponent resourcesItems={resourceList} addButtonConfiguration={{
                    isEnabled: false,
                    action: () => { },
                }}
                    infoButtonConfiguration={{
                        isEnabled: true,
                        action: handleOnClickInfo,
                    }} />
            </Grid>
        </Paper>
    </Grid>;
}
