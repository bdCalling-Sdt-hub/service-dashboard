import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:null,
    user:null
}
 const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loggedUser : (state,action)=>{
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.role = action.payload.role;
        },
        logoutUser : (state)=>{
            state.token = null;
            state.user = null;
            state.role = null;
        }
    }
})

export const {loggedUser,logoutUser} = authSlice.actions;
export default authSlice.reducer