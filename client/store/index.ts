import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice";
import dashboardSlice from "./dashboardSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    dashboard: dashboardSlice
  },
});

export type IRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
