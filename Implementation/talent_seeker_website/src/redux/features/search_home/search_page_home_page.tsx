import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import store, { RootState, useAppDispatch } from '../../store/store';
import { fetchItems } from './search_home_slice';
import {applyFilters} from '../resource_list/resource_list_slice';
import { Grid, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchHomeItem } from '../../../data/models';
import { useNavigate } from 'react-router-dom';
import SearchResourceComponent from '../../components/search_resource_component';

export default function Grouped() {

  const [selectedValues, setSelectedValues] = useState<SearchHomeItem[]>([]);
  const navigate = useNavigate();

  const handleAutocompleteChange = (event: any, newValue: SearchHomeItem[]) => {
    setSelectedValues(newValue);
  };
  
  const dispatch = useAppDispatch;
  const { items, loading, error } = useSelector((state: RootState) => state.searchHome);

  useEffect(() => {
    store.dispatch(fetchItems());
  }, [dispatch]);

  function handleSearch(event: any): void {
    const rolesIds = selectedValues.filter(e=>e.objectType === "role").map(e=>e.id);
    const resourcesIds = selectedValues.filter(e=>e.objectType === "resource").map(e=>e.id);
    const skillsIds = selectedValues.filter(e=>e.objectType === "skill").map(e=>e.id);

    const filters = {
      resourceIds : resourcesIds,
      roleIds : rolesIds,
      skillIds : skillsIds
    }
    store.dispatch(applyFilters(filters));
    navigate('/resourceList');
  }

  return (
    <Grid xs>
      <SearchResourceComponent searchItems={items} selectedValues={selectedValues}
        searchButtonConfiguration={{
          isEnabled: true,
          searchButtonComponent: <IconButton
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        }}
        handleAutoCompleteChange={handleAutocompleteChange}
      />
    </Grid>
  );
}
