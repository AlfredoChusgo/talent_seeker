

import { Button, Card, CardActions, CardContent, CardHeader, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TeamDetailComponentProps } from '../../data/component_props';

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

    return <Container>
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
                <Button variant="outlined" color="primary">
                    <DeleteIcon />
                </Button>
            </CardActions>
        </Card>
    </Container>;
}
