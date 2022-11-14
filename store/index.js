import panelSlice from "./panelSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    panel: panelSlice,
  },
});
