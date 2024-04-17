import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
    name:'state',
    initialState:{
        state:false
    },
    reducers:{
        setState:(state)=>{
            state.state=!state.state
          }
    }
})
export const {setState} = stateSlice.actions
export const stateSelector = (state) => state.state;
export default stateSlice.reducer