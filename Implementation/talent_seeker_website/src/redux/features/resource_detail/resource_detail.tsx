import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Slider, Stack, Typography } from "@mui/material";
import { ResourceItem, SkillItem, SkillLevel } from "../../../data/models";
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export interface ResourceDetailProps {
    resource: ResourceItem;
}

export interface SkillSliderProps {
    skill: SkillItem;
}

export default function ResourceDetail() {
    const {resource} = useSelector((state:RootState)=> state.resourceDetail);
    // const resource: ResourceItem = {
    //     "id": "ff5151b5-3466-4bf6-a68d-5da8f1e63ffe",
    //     "name": "Myrl",
    //     "lastName": "Grant",
    //     "birthDate": new Date(),
    //     "occupation": "Future Program Producer",
    //     "location": "Cocos (Keeling) Islands",
    //     "biography": "ear advocate, designer",
    //     "role": {
    //         "id": "74635442",
    //         "name": "Product Owner"
    //     },
    //     "skills": [
    //         {
    //             "id": "9",
    //             "name": "Python",
    //             "skillLevel": 3
    //         },
    //         {
    //             "id": "10",
    //             "name": "Java",
    //             "skillLevel": 4
    //         },
    //         {
    //             "id": "16",
    //             "name": "Django",
    //             "skillLevel": 2
    //         },
    //         {
    //             "id": "11",
    //             "name": "ASP.NET",
    //             "skillLevel": 1
    //         },
    //         {
    //             "id": "6",
    //             "name": "HTML",
    //             "skillLevel": 0
    //         }
    //     ]
    // };

    const skillSliders = resource.skills.map(skill => {
        return <Card>
            <CardContent>
                <Typography variant="body2" color="text.secondary" >
                    {skill.name}
                </Typography>
                <SkillSlider skill={skill} />
            </CardContent>
        </Card>
    });
    const component = (
        <Grid container direction="row" xs>
            <Grid sm={6} direction="column" spacing={2}>
                <Grid>
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
                                {/* {resource.birthDate.toDateString()} */}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid>
                    <Divider /> {/* Insert Divider */}
                </Grid>
                <Grid >
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" >
                                Biography
                            </Typography>

                            <Typography variant="body2" color="text.secondary" >
                                {resource.biography}
                            </Typography >
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid sm={6} >
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" >
                            Skills
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

