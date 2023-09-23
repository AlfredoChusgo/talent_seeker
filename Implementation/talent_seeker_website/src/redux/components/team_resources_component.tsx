import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ResourceItem } from '../../data/models';
import { TeamDetailComponentProps } from '../../data/component_props';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Container, IconButton } from '@mui/material';
import store from '../store/store';
import { removeResourceFromTeam } from '../features/team_detail/team_detail_slice';

export default function TeamResourcesComponent({ team }: TeamDetailComponentProps) {

    const buildPersonCard = (resource: ResourceItem) => {
        return (
            <List sx={{ width: '90%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="center" secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                        <DeleteForeverIcon onClick={() => {
                            store.dispatch(removeResourceFromTeam({ teamId: team.id, resourceId: resource.id }));
                        }} />
                    </IconButton>
                }>
                    <ListItemAvatar>
                        <Avatar>{resource.name[0]}{resource.lastName[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${resource.name}  ${resource.lastName}`}
                        secondary={resource.role.name}
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
        );
    }

    const resourceItemsUI = team.resources.map((e: ResourceItem) => {
        return (
            <Grid container justifyContent="center" alignItems="center">
                {buildPersonCard(e)}
            </Grid>

        );
    });

    if (team.resources.length > 0) {
        return (<Container>
            <Typography variant="h6" color="textSecondary">
                Team Members
            </Typography>
            {resourceItemsUI}
        </Container>);
    }
    else {
        return (
            <Grid container justifyContent="center" alignItems="center" direction="column" spacing={0}>
                <Grid item xs={10}>
                    <Typography variant="h5">No results to display</Typography>
                </Grid>
            </Grid>
        );
    }
}
