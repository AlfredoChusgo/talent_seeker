

import { Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TeamDetailComponentProps } from '../../data/component_props';
import store from '../store/store';
import { removeTeam } from '../features/team_detail/team_detail_slice';
import i18next from 'i18next';
import { updateAddEditTeamDialogConfig } from '../features/global_dialog/global_dialog_slice';

export default function TeamInfoSmallComponent({ team }: TeamDetailComponentProps) {

    const titleText = `${team.name} Team`;
    const subHeaderText = `Resources : ${team.resources.length}`;

    const resourcesSkills: Set<string> = new Set();
    team.resources.forEach((resource) => {
        resource.skills.forEach((skill) => resourcesSkills.add(skill.name));
    });

    const skillChips = [...resourcesSkills].map((skill) => {
        return <Chip label={skill} color="primary" variant="outlined"></Chip>
    });

    const teamInfo = <Container>
        <Card elevation={1}>
            <CardHeader title={titleText} subheader={subHeaderText} />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    <Grid container direction="row" spacing={2}>
                        <Grid item>
                            {skillChips}
                        </Grid>
                    </Grid>
                </Typography>
            </CardContent>
            <CardActions >
                <Button variant="outlined" color="primary" onClick={() => {
                    store.dispatch(removeTeam({ teamId: team.id }));
                }}>
                    <DeleteIcon />
                </Button>

                <Button variant="outlined" color="primary" onClick={() => {
                    store.dispatch(updateAddEditTeamDialogConfig({
                        isAdd: false,
                        show: true,
                        teamItem: team
                    }));
                }}>
                    <EditIcon />
                </Button>
            </CardActions>
        </Card>
    </Container>;
    const nothingToShow = <Container>
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="calc(100vh - 64px)" 
        >
            <Typography variant="h6" align="center">
                {i18next.t('')}
            </Typography>
        </Box>
    </Container>;

    return team.id === "" ? nothingToShow : teamInfo;
}
