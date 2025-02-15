import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState: {
    showSideBar:false,
    isLoggedIn:false,
    showLoader: false,
    userdetail: {},
  },
  reducers: {
    showSideBar: (state) => {
      state.showSideBar = true;
    },
    showLoader: (state) => {
      state.showLoader = true;
    },
    hideLoader: (state) => {
      state.showLoader = false;
    },
    setUserDetail: (state, action) => {
      state.userdetail = action.payload;
    },
    setIsLoggedIn(state,action){
      state.isLoggedIn = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  showLoader,
  hideLoader,
  setUserDetail,
  setIsLoggedIn,
  showSideBar, 
} = mainSlice.actions;

export default mainSlice.reducer;
