import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import store, { RootState, useAppDispatch } from '../../store/store';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Paper, Typography } from '@mui/material';
import { SearchItem } from '../../../data/models';
import { fetchItems } from '../search_home/search_home_slice';
import SearchTeamComponent from '../../components/search_team_component';
import { fetchTeamItems } from '../search_team/search_team_slice';
import TeamResourcesComponent from '../../components/team_resources_component';
import { fetchTeamDetail } from '../team_detail/team_detail_slice';

import TeamInfoSmallComponent from '../../components/team_info_small_component';
import AddIcon from '@mui/icons-material/Add';
import i18next from 'i18next';
import { updateAddEditTeamDialogConfig } from '../global_dialog/global_dialog_slice';
export default function TeamsPage() {
    const dispatch = useAppDispatch;

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

    const [openDialog, setOpenDialog] = useState(false);

    const [dialogTeamName, setDialogTeamName] = useState<string>("");

    return <Box sx={{ flexGrow: 0.5 }}>
        <Grid container direction="row" spacing={1} style={{padding:'16px'}}>
            <Grid xs={12} sm={6}>
                <Paper elevation={3}>

                    <Grid container direction="column" spacing={1}
                        justifyContent="center" >
                        <Button color="primary" aria-label="add" onClick={() => {
                            store.dispatch(updateAddEditTeamDialogConfig({
                                isAdd: true,
                                show: true,
                                teamItem: { id: "", name: "", resources: [] }
                            }));
                        }}>
                            <Typography>
                                {i18next.t('teams.addTeam')}
                                <AddIcon />
                            </Typography>

                        </Button>
                        <Grid xs>
                            <SearchTeamComponent
                                searchItems={teams}
                                selectedValue={seletedTeam}
                                handleAutoCompleteChange={function (event: any, value: SearchItem | null): void {
                                    setSeletedTeam(value);
                                    store.dispatch(fetchTeamDetail({ teamId: value?.id ?? "" }));
                                }} />
                        </Grid>
                        <TeamResourcesComponent team={teamDetail} />
                    </Grid>

                </Paper>

            </Grid>

            <Grid xs={12} sm={6}>
                <TeamInfoSmallComponent team={teamDetail} />
            </Grid>
        </Grid>

    </Box>;
}
