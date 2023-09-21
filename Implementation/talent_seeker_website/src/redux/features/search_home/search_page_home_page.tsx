import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import store, { RootState, useAppDispatch } from '../../store/store';
import { fetchItems } from './search_home_slice';
import {applyFilters} from '../resource_list/resource_list_slice';
import { Button, Grid, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchHomeItem } from '../../../data/models';

export default function Grouped() {

  const [selectedValues, setSelectedValues] = useState<SearchHomeItem[]>([]);

  const handleAutocompleteChange = (event: any, newValue: SearchHomeItem[]) => {
    console.log(newValue);
    setSelectedValues(newValue);
  };
  
  const dispatch = useAppDispatch;
  const { items, loading, error } = useSelector((state: RootState) => state.searchHome);
  const options = items;

  const sortedOptions = [...items].sort((a, b) =>
    -b.groupDisplayName.localeCompare(a.groupDisplayName)
  );


  useEffect(() => {
    // Dispatch the fetchPosts action when the component mounts
    //dispatch(fetchItems());
    store.dispatch(fetchItems());
  }, [dispatch]);

  function handleSearch(event: any): void {
    const filters = {}
    console.log(event);
    //store.dispatch(applyFilters())
  }

  return (
    <Grid item  xs={12} sm={6} md={8} lg={8} xl={8}>
      <Autocomplete
        id="grouped-demo"
        multiple
        options={sortedOptions}
        groupBy={(option) => option.groupDisplayName}
        getOptionLabel={(option) => option.displayName}
        onChange={handleAutocompleteChange}
        value={selectedValues}
        // renderInput={(params) => <TextField {...params} label="Search..." />}
        renderInput={(params) => (
          <div style={{ display: 'flex' }}>
            <TextField {...params} label="Search..." />
            <IconButton
            onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </div>
        )}
      />
    </Grid>
  );
}
