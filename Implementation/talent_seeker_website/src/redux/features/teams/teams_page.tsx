import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import store, { RootState, useAppDispatch } from '../../store/store';
import { fetchAllResourceItems } from '../resource_list/resource_list_slice';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ResourceListComponent from '../../components/resourcec_list_component';
import { AutocompleteChangeReason, Button, IconButton, Paper } from '@mui/material';
import { SearchHomeItem, SearchItem, SnackbarSeverity } from '../../../data/models';
import SearchResourceComponent from '../../components/search_resource_component';
import { applyFilters } from '../resource_list/resource_list_slice';
import { fetchItems } from '../search_home/search_home_slice';
import SearchTeamComponent from '../../components/search_team_component';
import { fetchTeamItems } from '../search_team/search_team_slice';
import TeamDetailComponent from '../../components/team_detail_component';
import { addResourceToTeam, fetchTeamDetail } from '../team_detail/team_detail_slice';

import { showSnackbar } from '../global_snackbar/global_snackbar_slice';
import TeamInfoSmallComponent from '../../components/team_info_small_component';

export default function TeamsPage() {
    const dispatch = useAppDispatch;
    const { resourceList } = useSelector((state: RootState) => state.resourceList);

    useEffect(() => {
        store.dispatch(fetchAllResourceItems());
    }, [dispatch]);

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

    //endAddResourceToTeam
    return <Box sx={{ flexGrow: 0.5 }}>
        <Grid container direction="row" spacing={3} >
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Paper elevation={3}>
                    <Grid container direction="column" spacing={1}
                        justifyContent="center" >
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <SearchTeamComponent
                                searchItems={teams}
                                selectedValue={seletedTeam}
                                handleAutoCompleteChange={function (event: any, value: SearchItem | null, reason: AutocompleteChangeReason): void {
                                    setSeletedTeam(value);

                                    if (value != null) {
                                        store.dispatch(fetchTeamDetail({ teamId: value.id }));
                                    }

                                }} />
                        </Grid>
                        <TeamDetailComponent team={teamDetail} />
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TeamInfoSmallComponent team={teamDetail} />
            </Grid>
        </Grid>

    </Box>;
}
