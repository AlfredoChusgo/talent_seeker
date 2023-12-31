import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import store, { RootState, useAppDispatch } from '../../store/store';
import { fetchAllResourceItems } from '../resource_list/resource_list_slice';

import Grid from '@mui/material/Unstable_Grid2';
import ResourceListComponent from '../../components/resource_list_component';
import { AutocompleteChangeReason, IconButton, Paper } from '@mui/material';
import { ResourceItem, SearchHomeItem, SearchItem } from '../../../data/models';
import SearchResourceComponent from '../../components/search_resource_component';
import { applyFilters } from '../resource_list/resource_list_slice';
import { fetchItems } from '../search_home/search_home_slice';
import SearchTeamComponent from '../../components/search_team_component';
import { fetchTeamItems } from '../search_team/search_team_slice';
import TeamResourcesComponent from '../../components/team_resources_component';
import { addResourceToTeam, fetchTeamDetail } from '../team_detail/team_detail_slice';
import { selectResource } from '../resource_detail/resource_detail_slice';
import { dispatchShowResourceDetailDialog } from '../global_dialog/global_dialog_slice';

export default function TeamBuilderPage() {
    const dispatch = useAppDispatch;
    const { resourceList } = useSelector((state: RootState) => state.resourceList);
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

    useEffect(() => {
        store.dispatch(fetchItems());
        store.dispatch(fetchTeamItems());
    }, [dispatch]);


    //SearchTeam
    const [seletedTeam, setSeletedTeam] = useState<SearchItem | null>(null);
    const { teams } = useSelector((state: RootState) => state.searchTeam);
    //endSearchTeam

    //team
    // const [seletedTeam, setSeletedTeam] = useState<SearchItem | null >(null);
    const { teamDetail } = useSelector((state: RootState) => state.teamDetail);
    //endTeam

    //addResourceToTeam
    function handleOnClickInfo(resource: ResourceItem): void {
        store.dispatch(selectResource(resource));
        store.dispatch(dispatchShowResourceDetailDialog({show:true}));

    }

    function handleOnClickAddResource(resourceId: string): void {
        store.dispatch(addResourceToTeam({ resourceId: resourceId, teamId: seletedTeam?.id ?? "" }));
    }

    //endAddResourceToTeam
    return   <Grid container spacing={1} style={{padding:'16px'}} xs>
                <Grid  xs={12} sm={8}  >
                    <Paper elevation={1}>
                        <Grid container direction="column" 
                            justifyContent="center" >
                            <Grid  xs>
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
                                isEnabled: true,
                                action: handleOnClickAddResource,
                            }}
                                infoButtonConfiguration={{
                                    isEnabled: true,
                                    action: handleOnClickInfo,
                                }} />
                        </Grid>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={4}>
                    <Paper elevation={3}>
                        <Grid container direction="column" spacing={0}
                            justifyContent="center" >
                            <Grid xs>
                                <SearchTeamComponent
                                    searchItems={teams}
                                    selectedValue={seletedTeam}
                                    handleAutoCompleteChange={function (event: any, value: SearchItem | null): void {
                                        setSeletedTeam(value);

                                        if (value != null) {
                                            store.dispatch(fetchTeamDetail({ teamId: value.id }));
                                        }

                                    }} />
                            </Grid>
                            <TeamResourcesComponent team={teamDetail} />
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>;
}
