import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { ResourceItem } from '../../data/models';
import { getSkillLevelString } from '../../helpers/enum_helper';
import { ResourceListComponentProps } from '../../data/component_props';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import i18next from 'i18next';


export default function ResourceListComponent( {resourcesItems ,addButtonConfiguration ,infoButtonConfiguration} : ResourceListComponentProps) {

    const buildPersonCard = (resource: ResourceItem) => {

        return (
            // <Grid sx={{ padding: '16px' }}xs={6} sm={3}  md={2} lg={2}key={resource.id}>
            // <Grid sx={{ padding: '16px' }}xs={6} sm={3} key={resource.id}>
            <Grid  xs={6} sm={3} key={resource.id}>
                <Paper >
                    <Card >
                        <Stack direction="row" spacing={1} >                            
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
                                    {infoButtonConfiguration.isEnabled && <Button size="small" variant="text" onClick={() => {
                                        infoButtonConfiguration.action(resource.id);
                                    }} startIcon={<InfoIcon />}>
                                    </Button>}
                                    {addButtonConfiguration.isEnabled && <Button size="small" variant="text" onClick={() => {
                                        addButtonConfiguration.action(resource.id);
                                    }} startIcon={<AddCircleIcon />}>
                                    </Button>}

                                </CardActions>
                            </Box>
                        </Stack>


                    </Card>
                </Paper>
            </Grid>
        );
    }

    const buildSkillsCards = ({ skills ,id}: ResourceItem) => {
        const skillsCards = skills.map(skill => {

            return (
                <Grid key={skill.id} >
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
        return <Grid  xs={6} sm={9} >
            <Grid container direction={"row"} spacing={1}>
                {skillsCards}
            </Grid>
        </Grid>;
    }

    const resourceItemsUI = resourcesItems.map((e: ResourceItem) => {
        return (
            <Grid  container spacing={2} key={e.id}>
                {buildPersonCard(e)}
                {buildSkillsCards(e)}
            </Grid>

        );
    });

    if(resourcesItems.length > 0){
        return <Grid >
            {resourceItemsUI}
        </Grid>;
    }
    else{
        return (
            <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
              <Grid xs>
                <Typography variant="h5">{i18next.t("common.noResults")}</Typography>
              </Grid>
            </Grid>
          );
    }
}
