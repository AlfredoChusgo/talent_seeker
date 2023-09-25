import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Slider, Stack, Typography } from "@mui/material";
import { ResourceItem, SkillItem, SkillLevel } from "../../../data/models";
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import i18next from "i18next";

export interface ResourceDetailProps {
    resource: ResourceItem;
}

export interface SkillSliderProps {
    skill: SkillItem;
}

export default function ResourceDetail() {
    const {resource} = useSelector((state:RootState)=> state.resourceDetail);

    const skillSliders = resource.skills.map(skill => {
        return <Grid xs style={{padding:'8px'}}>
            <Card >
            <CardContent >
                <Typography variant="body2" color="text.secondary" >
                    {skill.name}
                </Typography>
                <SkillSlider skill={skill} />
            </CardContent>
        </Card>
        </Grid>
    });
    const component = (
        <Grid container direction="row" xs>
            <Grid sm={6} direction="column" spacing={2}>
                <Grid style={{padding:'8px'}}>
                    <Card >
                        <CardContent>
                            <Avatar >{resource.name[0]}{resource.lastName[0]}</Avatar>
                            <Typography gutterBottom variant="h5" component="div">
                                {`${resource.name} ${resource.lastName}`}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {resource.role.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" component="div">
                                {resource.occupation}
                                {resource.location}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid>
                    <Divider /> 
                </Grid>
                <Grid style={{padding:'8px'}}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" >                                
                                {i18next.t('common.biography')}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" >
                                {resource.biography}
                            </Typography >
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid sm={6} style={{padding:'8px'}}>
                <Card >
                    <CardContent >
                        <Typography gutterBottom variant="h5" >
                        {i18next.t('common.skills')}
                        </Typography>

                        {skillSliders}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );


    return component;
}

const enumValues = Object.values(SkillLevel).filter((value) =>
    typeof value === 'string'
);

function SkillSlider({ skill }: SkillSliderProps) {
    const [sliderValue, setSliderValue] = useState(skill.skillLevel); // Initialize with the initial value


    const marks = enumValues.map((value, index) => index==skill.skillLevel ? { value: index, label: value } : { value: index, label: "" });

    return (
        <div style={{ padding: '16px' }}>
            <Slider
                // defaultValue={skill.skillLevel}
                value={sliderValue}
                min={0}
                max={enumValues.length - 1}
                step={1}
                marks={marks}
                onChange={(event, newValue) => {
                    setSliderValue(sliderValue);
                  }}
            />
        </div>
    );
};

