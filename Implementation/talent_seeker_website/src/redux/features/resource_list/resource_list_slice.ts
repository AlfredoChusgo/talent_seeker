import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

enum SkillLevel
{
    Novice,         // Basic knowledge, limited experience
    Beginner,       // Limited proficiency, still learning
    Intermediate,   // Moderate proficiency, some experience
    Proficient,     // Competent, good understanding
    Advanced,       // High proficiency, extensive experience
    Expert,         // Mastery or expert level
}


interface ResourceItem{
    id: string;
    name : string;
    lastName : string ;
    birthDate: Date;
    occupation : string;
    location : string;
    biography : string;
    role: RoleItem;
    skills: SkillItem[]
}

interface RoleItem{
    id: string;
    name : string;    
}

interface SkillItem{
    id: string;
    name : string;
    skillLevel : SkillLevel
}


interface ResourceListState {
  resourceList: ResourceItem[];
  loading : boolean;
  error : string;
}

const initialState: ResourceListState = {
    resourceList: [],
    loading: false,
    error : "",
};

export const fetchResourceItems = createAsyncThunk('resourcesList/fetchResourceItems', async () => {
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
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchResourceItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResourceItems.fulfilled, (state,action) => {
        state.loading = false;
        state.resourceList = action.payload;
      })
      .addCase(fetchResourceItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      });
  }
});

//export const { increment, decrement } = searchHomeSlice.actions;
export default resourceListSlice.reducer;
