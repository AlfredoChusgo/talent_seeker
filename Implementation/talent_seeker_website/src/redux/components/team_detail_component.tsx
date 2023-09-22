import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CardActions from '@mui/material/CardActions';
import { ResourceItem } from '../../data/models';
import { TeamDetailComponentProps } from '../../data/component_props';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { IconButton, ListItemButton } from '@mui/material';

export default function TeamDetailComponent({ team }: TeamDetailComponentProps) {

    const buildPersonCard = (resource: ResourceItem) => {
        return (
            <List sx={{ width: '90%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="center" secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                        <DeleteForeverIcon />
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
        return resourceItemsUI;
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
