import React, { useEffect } from 'react';
import {  useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import store , { RootState,useAppDispatch} from '../redux/store/store';
import { fetchItems } from '../redux/features/search_home/search_home_slice';

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
      options={sortedOptions}
      groupBy={(option) => option.groupDisplayName}
      getOptionLabel={(option) => option.displayName}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="With categories" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  
  { title: 'The Kid', year: 1921,group: "one" },
  { title: 'Inglourious Basterds', year: 2009 , group: "one" },
  { title: 'Snatch', year: 2000, group: "one" },
  { title: '3 Idiots', year: 2009 , group: "two"},
  { title: 'Monty Python and the Holy Grail', year: 1975 , group: "three"},
];

// import { Form } from "react-router-dom";

// export default function SearchPageHome() {
//   const contact = {
//     first: "Your",
//     last: "Name",
//     avatar: "https://placekitten.com/g/200/200",
//     twitter: "your_handle",
//     notes: "Some notes",
//     favorite: true,
//   };

//   return (
//     <div id="contact">
//       <h1>Search page HOme</h1>
//     </div>
//   );
// }
