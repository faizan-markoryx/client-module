import { createSlice } from "@reduxjs/toolkit";

export interface loginState {
  userData: {
    id: number,
    email: string,
    phone: string,
    role: number,
    token: string
  };

  refresh:any

}

const userData: any = localStorage.getItem("clientModuleUserData");
const isUser = JSON.parse(userData || null);

const initialState: loginState = {
  userData: isUser || {},
  refresh:false

};

export const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
    setUserLogin: (state, action) => {
      localStorage.setItem("clientModuleUserData", JSON.stringify(action.payload));
      localStorage.setItem("isOwnerData", "false");  
      state.userData = action.payload;
    },
    
    setUserLogOut: (state: any) => {
      state.userData = {}
    },

    setPageRefresh:(state) =>{
        state.refresh = !state.refresh
    }

  },
});

export const { setUserLogin, setUserLogOut, setPageRefresh } = loginSlice.actions;

export default loginSlice.reducer;
