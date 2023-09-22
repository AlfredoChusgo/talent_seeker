import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import store, { RootState, useAppDispatch } from '../../store/store';
import { fetchAllResourceItems } from '../resource_list/resource_list_slice';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ResourceListComponent from '../../components/resourcec_list_component';
import {  AutocompleteChangeReason, IconButton } from '@mui/material';
import { SearchHomeItem, SearchItem } from '../../../data/models';
import SearchResourceComponent from '../../components/search_resource_component';
import { applyFilters } from '../resource_list/resource_list_slice';
import { fetchItems } from '../search_home/search_home_slice';
import SearchTeamComponent from '../../components/search_team_component';
import { fetchTeamItems } from './search_team_slice';


export default function TeamBuilderPage() {
    const dispatch = useAppDispatch;
    const { resourceList } = useSelector((state: RootState) => state.resourceList);

    useEffect(() => {
        store.dispatch(fetchAllResourceItems());
    }, [dispatch]);


    const [selectedValues, setSelectedValues] = useState<SearchHomeItem[]>([]);
  
    const handleAutocompleteChange = (event: any, newValue: SearchHomeItem[]) => {
      setSelectedValues(newValue);

      const rolesIds = newValue.filter(e=>e.objectType === "role").map(e=>e.id);
      const resourcesIds = newValue.filter(e=>e.objectType === "resource").map(e=>e.id);
      const skillsIds = newValue.filter(e=>e.objectType === "skill").map(e=>e.id);
  
      const filters = {
        resourceIds : resourcesIds,
        roleIds : rolesIds,
        skillIds : skillsIds
      }
      store.dispatch(applyFilters(filters));
      store.dispatch(fetchAllResourceItems());
    };
    
    //const dispatch = useAppDispatch;
    const { items, loading, error } = useSelector((state: RootState) => state.searchHome);
  
    useEffect(() => {
      store.dispatch(fetchItems());
      store.dispatch(fetchTeamItems());
    }, [dispatch]);  


    //SearchTeam
    const [seletedTeam, setSeletedTeam] = useState<SearchItem | null >(null);
    const { teams } = useSelector((state: RootState) => state.searchTeam);
    //endSearchTeam
    return <Box sx={{ flexGrow:  0}}>
        <Grid container direction="row" spacing={1} >
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}  >
                <Grid container direction="column" spacing={1}
                    justifyContent="center" >
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <SearchResourceComponent searchItems={items} selectedValues={selectedValues}
                            searchButtonConfiguration={{
                                isEnabled: true,
                                searchButtonComponent: <IconButton
                                >
                                </IconButton>
                            }}
                            handleAutoCompleteChange={handleAutocompleteChange}
                        />
                    </Grid>
                    <ResourceListComponent resourcesItems={resourceList} />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Grid container direction="column" spacing={1}
                    justifyContent="center" >
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <SearchTeamComponent 
                        searchItems={teams} 
                        selectedValue={seletedTeam} 
                        handleAutoCompleteChange={function (event: any, value: SearchItem | null, reason: AutocompleteChangeReason): void {
                            setSeletedTeam(value);
                        } }/>
                    </Grid>
                    <ResourceListComponent resourcesItems={resourceList} />
                </Grid>
            </Grid>

        </Grid>

    </Box>;
}
