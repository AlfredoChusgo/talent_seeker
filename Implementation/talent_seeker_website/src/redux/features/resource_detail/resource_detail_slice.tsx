import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ResourceItem } from "../../../data/models";


interface ResourceDetailState {
    resource : ResourceItem;
}

const initialState : ResourceDetailState = {
    resource:{
        id: "",
        name: "",
        lastName: "",
        birthDate: "",
        occupation: "",
        locality: "",
        biography: "",
        role: {
            id: "",
            name: ""
        },
        skills: []
    }
};

const resourceDetailSlice = createSlice({
    name:'resourceDetail',
    initialState,
    reducers:{
        selectResource: (state,action: PayloadAction<ResourceItem>)=>{
            state.resource = action.payload;
        }
    }
});

export const { selectResource} = resourceDetailSlice.actions;
export default resourceDetailSlice.reducer;