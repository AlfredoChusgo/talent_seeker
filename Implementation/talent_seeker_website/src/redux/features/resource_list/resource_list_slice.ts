import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ResourceItem, SearchResourceFilterQuery } from '../../../data/models';


interface ResourceListState {
  resourceList: ResourceItem[];
  filters: SearchResourceFilterQuery;
  loading: boolean;
  error: string;
}

const initialState: ResourceListState = {
  resourceList: [],
  filters: {
    resourceIds:[],
    roleIds:[],
    skillIds:[]
  },
  loading: false,
  error: "",
};

export const fetchAllResourceItems = createAsyncThunk<ResourceItem[]>('resourcesList/fetchResourceItems', async ()   => {
  try {
    const response = await axios.get("fake_data/resources_data.json");
    return response.data;
  } catch (error) {
    throw error;
  }
});


const resourceListSlice = createSlice({
  name: 'resourceList',
  initialState,
  reducers:
  {
    applyFilters : (state,action : PayloadAction<SearchResourceFilterQuery>)=>{
      state.filters = action.payload;      
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllResourceItems.pending, (state) => {
      state.loading = true;
    })
      .addCase(fetchAllResourceItems.fulfilled, (state, action) => {
        state.loading = false;
        const filteredResources = action.payload.filter((resource) => {
          const resourceFilterNotApplied = state.filters.resourceIds.length == 0;
          const roleFilterNotApplied = state.filters.roleIds.length ==  0;
          const skillFilterNotApplied = state.filters.skillIds.length == 0;

          if(resourceFilterNotApplied && 
            roleFilterNotApplied &&
            skillFilterNotApplied){
              return true;
            }


          const resourceIdsFilter = state.filters.resourceIds.includes(resource.id);
          const roleIdsFilter = state.filters.roleIds.includes(resource.role.id);

          const resourceSkillsId = resource.skills.map(skill => skill.id);
          const skillIdsFilter = state.filters.skillIds.every((skillId) => resourceSkillsId.includes(skillId));
          
          
          return (!resourceFilterNotApplied ? resourceIdsFilter : true ) 
                && (!roleFilterNotApplied ? roleIdsFilter : true) 
                && (!skillFilterNotApplied ? skillIdsFilter : true);

        });
        state.resourceList = filteredResources;
      })
      .addCase(fetchAllResourceItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      });
  }
});

//export const { increment, decrement } = searchHomeSlice.actions;
export const { applyFilters } = resourceListSlice.actions;
export default resourceListSlice.reducer;
