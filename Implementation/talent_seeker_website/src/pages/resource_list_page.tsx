import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import store, { RootState, useAppDispatch } from '../redux/store/store';
import { fetchResourceItems } from '../redux/features/resource_list/resource_list_slice';
import { Button, Grid, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
export default function ResourceListPage() {


  const dispatch = useAppDispatch;
  const { resourceList , loading, error } = useSelector((state: RootState) => state.resourceList);


  useEffect(() => {
    store.dispatch(fetchResourceItems());
  }, [dispatch]);

  return (
    <Grid item  xs={12} sm={6} md={8} lg={8} xl={8}>
        <div>
      <h2>Resource List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Birth Date</th>
            <th>Occupation</th>
            <th>Location</th>
            <th>Biography</th>
            <th>Role</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {resourceList.map((resource) => (
            <tr key={resource.id}>
              <td>{resource.id}</td>
              <td>{resource.name}</td>
              <td>{resource.lastName}</td>
              {/* <td>{resource.birthDate.toDateString()}</td> */}
              <td>{resource.birthDate instanceof Date ? resource.birthDate.toISOString() : "N/A"}</td>
              <td>{resource.occupation}</td>
              <td>{resource.location}</td>
              <td>{resource.biography}</td>
              <td>{resource.role.name}</td>
              <td>
                <ul>
                  {resource.skills.map((skill) => (
                    <li key={skill.id}>
                      {skill.name} (Skill Level: {skill.skillLevel})
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Grid>
  );
}
