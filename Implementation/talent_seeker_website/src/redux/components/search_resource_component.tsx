import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import store, { RootState, useAppDispatch } from '../../store/store';
// import { fetchItems } from './search_home_slice';
// import {applyFilters} from '../resource_list/resource_list_slice';
// import { Button, Grid, IconButton, Paper } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { SearchHomeItem } from '../../../data/models';
// import { useNavigate } from 'react-router-dom';
import { SearchResourceComponentProps } from '../../data/component_props';

export default function SearchResourceComponent({searchItems,selectedValues,searchButtonConfiguration,handleAutoCompleteChange } : SearchResourceComponentProps) {

  //const [selectedValues, setSelectedValues] = useState<SearchHomeItem[]>([]);
  //const navigate = useNavigate();

//   const handleAutocompleteChange = (event: any, newValue: SearchHomeItem[]) => {
//     setSelectedValues(newValue);
//   };
  
//   const dispatch = useAppDispatch;
  const ab = searchButtonConfiguration.isEnabled
  //const { items, loading, error } = useSelector((state: RootState) => state.searchHome);

  const sortedOptions = [...searchItems].sort((a, b) =>
    -b.objectType.localeCompare(a.objectType)
  );


//   useEffect(() => { todo
//     store.dispatch(fetchItems());
//   }, [dispatch]);

//   function handleSearch(event: any): void {
//     const rolesIds = selectedValues.filter(e=>e.objectType === "role").map(e=>e.id);
//     const resourcesIds = selectedValues.filter(e=>e.objectType === "resource").map(e=>e.id);
//     const skillsIds = selectedValues.filter(e=>e.objectType === "skill").map(e=>e.id);

//     const filters = {
//       resourceIds : resourcesIds,
//       roleIds : rolesIds,
//       skillIds : skillsIds
//     }
//     store.dispatch(applyFilters(filters));
//     navigate('/resourceList');
//   }

  return (
    // <Grid item  xs={12} sm={6} md={8} lg={8} xl={8}>
      <Autocomplete
        id="grouped-demo"
        multiple
        options={sortedOptions}
        groupBy={(option) => option.objectType}
        getOptionLabel={(option) => option.displayName}
        onChange={handleAutoCompleteChange}
        value={selectedValues}
        renderInput={(params) => (
          <div style={{ display: 'flex' }}>
            <TextField {...params} label="Search..." />
            {/* <IconButton
            onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton> */}
             {searchButtonConfiguration.isEnabled && (
                // Your JSX content to render when isEnabled is true
                searchButtonConfiguration.searchButtonComponent
            )}
          </div>
        )}
      />
    // </Grid>
  );
}
