
// import store, { RootState, useAppDispatch } from '../../store/store';
// import { fetchAllResourceItems } from './resource_list_slice';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import CardActions from '@mui/material/CardActions';
import { ResourceItem } from '../../data/models';
import { getSkillLevelString } from '../../helpers/enum_helper';
import { ResourceListComponentProps } from '../../data/component_props';
//import { getSkillLevelString } from '../../../helpers/enum_helper';
//import { ResourceItem } from '../../../data/models';


export default function ResourceListComponent( {resourcesItems } : ResourceListComponentProps) {
    //const dispatch = useAppDispatch;
    //const { resourceList, loading, error } = useSelector((state: RootState) => state.resourceList);

    const buildPersonCard = (resource: ResourceItem) => {
        return (
            <Grid item xs={2}>
                <Paper>
                    <Card sx={{ display: 'flex' }}>
                        <Stack direction="row" spacing={1} alignContent={"center"} justifyContent={"center"} alignSelf={"center"}>                            
                            <Box >
                                <CardContent >
                                <Avatar>{resource.name[0]}{resource.lastName[0]}</Avatar>
                                    <Typography component="div" variant="h6">
                                        {resource.name} {resource.lastName}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {resource.role.name}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="text" startIcon={<InfoIcon />}>
                                    </Button>
                                    <Button size="small" variant="text" startIcon={<AddIcon />}>
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

    const resourceItemsUI = resourcesItems.map((e: ResourceItem) => {
        return (
            <Grid container spacing={2}>
                {buildPersonCard(e)}
                {buildSkillsCards(e)}
            </Grid>

        );
    });

    return resourceItemsUI;
}
