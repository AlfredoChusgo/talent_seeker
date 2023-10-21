import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';
import { SkillItem } from '../../data/models';
import { SkillListComponentProps } from '../../data/component_props';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { Container, IconButton, Stack } from '@mui/material';
import i18next from 'i18next';
import store from '../store/store';
import { removeSkill } from '../features/skills/skills_slice';
import { updateAddEditSkillDialogConfig } from '../features/global_dialog/global_dialog_slice';

export default function SkillsComponent({ skills }: SkillListComponentProps) {

    const buildCard = (skill: SkillItem) => {
        return (
            <List sx={{ width: '90%', bgcolor: 'background.paper' }}>
                <ListItem key={skill.id} alignItems="center" secondaryAction={
                    <Stack direction="row" spacing={1}>
                        <IconButton edge="end" aria-label="comments">
                            <Edit onClick={() => {
                                store.dispatch(updateAddEditSkillDialogConfig({
                                    isAdd: false,
                                    show: true,
                                    skillItem: skill
                                }));
                            }} />
                        </IconButton>
                        <IconButton edge="end" aria-label="comments">
                            <DeleteForeverIcon onClick={() => {
                                store.dispatch(removeSkill({ skillId: skill.id }));
                            }} />
                        </IconButton>

                    </Stack>

                }>
                    <ListItemText
                        primary={`${skill.name}`}
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
        );
    }

    const itemsUI = skills.map((e: SkillItem) => {
        return (
            <Grid container justifyContent="center" alignItems="center">
                {buildCard(e)}
            </Grid>

        );
    });

    if (skills.length > 0) {
        return (<Container>
            {itemsUI}
        </Container>);
    }
    else {
        return (
            <Grid container justifyContent="center" alignItems="center" direction="column" spacing={0}>
                <Grid xs={10}>
                    <Typography variant="h5">{i18next.t('common.noResults')}</Typography>
                </Grid>
            </Grid>
        );
    }
}
