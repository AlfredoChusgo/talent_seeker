import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import store, { RootState, useAppDispatch } from '../../store/store';
import { fetchAllResourceItems } from './resource_list_slice';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import deepOrange from '@mui/material/colors/deepOrange';
import deepPurple from '@mui/material/colors/deepPurple';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import CardActions from '@mui/material/CardActions';
import { getSkillLevelString } from '../../../helpers/enum_helper';
import { ResourceItem } from '../../../data/models';


export default function ResourceListPage() {
    const dispatch = useAppDispatch;
    const { resourceList, loading, error } = useSelector((state: RootState) => state.resourceList);

    const buildPersonCard = (resource: ResourceItem) => {
        return (
            <Grid item xs={2}>
                <Paper>
                    <Card sx={{ display: 'flex' }}>
                        <Stack direction="row" spacing={1} alignContent={"center"} justifyContent={"center"} alignSelf={"center"}>
                            <Avatar>{resource.name[0]}</Avatar>
                            <Box >
                            <CardContent >
                                <Typography component="div" variant="h6">
                                    {resource.name} {resource.lastName}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {resource.role.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="text" startIcon={<InfoIcon />}>
                                    {/* Details */}
                                </Button>
                            </CardActions>
                        </Box>
                        </Stack>


                    </Card>
                </Paper>
            </Grid>
        );
    }

    const buildSkillsCards = ({ skills }: ResourceItem) => {
        const skillsCards = skills.map(skill => {

            return (
                <Grid item xs={2} >
                    <Paper elevation={1}>
                        <Card sx={{ display: 'flex' }}>

                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography variant="h5" component="div" align="center">
                                    {skill.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    {getSkillLevelString(skill.skillLevel)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            );
        });
        return <Grid item xs={8}>
            <Grid container direction={"row"} spacing={2}>
                {skillsCards}
            </Grid>
        </Grid>;
    }

    const resourceItemsUI = resourceList.map(e => {
        return (
            <Grid container spacing={2}>
                {buildPersonCard(e)}
                {buildSkillsCards(e)}
                <Grid item xs={1} alignContent={'center'} alignSelf={'center'}>
                    
                </Grid>
                <Grid item xs={1} sx={{ bgcolor: deepPurple[500] }}>
                    xs=1
                </Grid>
            </Grid>

        );
    });


    useEffect(() => {
        store.dispatch(fetchAllResourceItems());
    }, [dispatch]);

    return <Box sx={{ flexGrow: 1 }}>
        <Grid container direction="column" spacing={0}>
            {resourceItemsUI}
        </Grid>
    </Box>;
}
