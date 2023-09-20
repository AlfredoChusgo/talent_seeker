import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import store, { RootState, useAppDispatch } from '../redux/store/store';
import { fetchItems } from '../redux/features/search_home/search_home_slice';
import { Button, Grid, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
export default function Grouped() {


  const dispatch = useAppDispatch;
  const { items, loading, error } = useSelector((state: RootState) => state.searchHome);

  // const options = items.map((option) => {
  //   const firstLetter = option.title[0].toUpperCase();
  //   return {
  //     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //     ...option,
  //   };
  // });
  const options = items;

  const sortedOptions = [...items].sort((a, b) =>
    -b.groupDisplayName.localeCompare(a.groupDisplayName)
  );


  useEffect(() => {
    // Dispatch the fetchPosts action when the component mounts
    //dispatch(fetchItems());
    store.dispatch(fetchItems());
  }, [dispatch]);

  return (

    <Autocomplete
      id="grouped-demo"
      multiple
      options={sortedOptions}
      groupBy={(option) => option.groupDisplayName}
      getOptionLabel={(option) => option.displayName}
      sx={{ width: 300 }}
      // renderInput={(params) => <TextField {...params} label="Search..." />}
      renderInput={(params) => (
        <div style={{ display: 'flex' }}>          
          <TextField {...params} label="Search..." />
          <IconButton 
          //onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </div>
      )}
    />
  );
}
