import { createSlice } from "@reduxjs/toolkit";

export interface userState {
    page:any,
    perPage:any,
    userTableData:any
  
  }

  const initialState: userState = {
    page:"1",
    perPage:"20",
    userTableData:{}
  
  };

  export const userSlice = createSlice({
    name: "userTable",
    initialState,
    reducers:{
        setPagePerPage:(state,action)=>{
            state.page = action.payload.page,
            state.perPage = action.payload.perPage
        },
        setUserTableAllData:(state,action) =>{
          state.userTableData = action.payload
        }
    }
  })

  export const { setPagePerPage,setUserTableAllData } = userSlice.actions

  export default userSlice.reducer
