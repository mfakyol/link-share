import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
  isLogin: boolean;
  username: string;
}

const initialState: GlobalState = {
  isLogin: false,
  username: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    increment: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { increment } = globalSlice.actions;

export default globalSlice.reducer;
