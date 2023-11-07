import { arrayMove } from "@dnd-kit/sortable";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DashboardState {
  pageSetting?: PageSetting;
}

const initialState: DashboardState = {
  pageSetting: undefined,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setPageSetting: (state, action: PayloadAction<PageSetting>) => {
      state.pageSetting = action.payload;
    },
    addLink: (state, action: PayloadAction<PageSetting["links"][number]>) => {
      state.pageSetting?.links.push(action.payload);
    },
    updateLink: (state, action: PayloadAction<PageSetting["links"][number]>) => {
      if (!state.pageSetting) return;
      state.pageSetting.links = state.pageSetting.links.map((link) => {
        if (link._id == action.payload._id) {
          return { ...action.payload };
        }
        return link;
      });
    },
    deleteLink: (state, action: PayloadAction<string>) => {
      if (!state.pageSetting) return;
      state.pageSetting.links = state.pageSetting.links.filter((link) => link._id !== action.payload);
    },
    sortLinks: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      if (!state.pageSetting) return;
      const oldIndex = state.pageSetting.links.findIndex((l) => l._id == action.payload.activeId);
      const newIndex = state.pageSetting.links.findIndex((l) => l._id == action.payload.overId);
      state.pageSetting.links = arrayMove(state.pageSetting.links, oldIndex, newIndex);
    },
    updateTitle: (state, action: PayloadAction<string>) => {
      if (!state.pageSetting) return;
      state.pageSetting.title = action.payload;
    },
    updateBio: (state, action: PayloadAction<string>) => {
      if (!state.pageSetting) return;
      state.pageSetting.bio = action.payload;
    },
    updateColor: (state, action: PayloadAction<{ key: keyof PageSetting["colors"]; value: string }>) => {
      if (!state.pageSetting) return;
      state.pageSetting.colors[action.payload.key] = action.payload.value;
    },

    updateButtonStyle: (state, action: PayloadAction<string>) => {
      if (!state.pageSetting) return;
      state.pageSetting.buttonStyle = action.payload;
    },
    updateFont: (state, action: PayloadAction<PageSetting["font"]>) => {
      if (!state.pageSetting) return;
      state.pageSetting.font = action.payload;
    },
    sortSocials: (state, action: PayloadAction<{ activeId: number; overId: number }>) => {
      if (!state.pageSetting) return;
      const oldIndex = state.pageSetting.socials.findIndex((s) => s.type === action.payload.activeId);
      const newIndex = state.pageSetting.socials.findIndex((s) => s.type === action.payload.overId);
      state.pageSetting.socials = arrayMove(state.pageSetting.socials, oldIndex, newIndex);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPageSetting,
  addLink,
  updateLink,
  deleteLink,
  sortLinks,
  updateTitle,
  updateBio,
  updateColor,
  updateButtonStyle,
  updateFont,
  sortSocials,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
