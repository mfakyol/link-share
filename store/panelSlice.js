import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: null,
};

export const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },

    setPageLinks: (state, action) => {
      state.page.links = action.payload;
    },

    setProfileTitle: (state, action) => {
      state.page.profileTitle = action.payload;
    },

    setProfileDescription: (state, action) => {
      state.page.profileDescription = action.payload;
    },

    setProfileDescription: (state, action) => {
      state.page.profileDescription = action.payload;
    },

    setPageBackgroundColor: (state, action) => {
      state.page.styles.backgroundColor = action.payload;
    },

    setPageBackgroundType: (state, action) => {
      state.page.styles.backgroundType = action.payload;
    },

    setPageLinkColor: (state, action) => {
      state.page.styles.link.color = action.payload;
    },

    setPageLinkBackgroundColor: (state, action) => {
      state.page.styles.link.backgroundColor = action.payload;
    },

    setPageLinkBorderColor: (state, action) => {
      state.page.styles.link.borderColor = action.payload;
    },

    setPageLinkShadowColor: (state, action) => {
      state.page.styles.link.shadowColor = action.payload;
    },

    setPageLinkStyle: (state, action) => {
      state.page.styles.link.style = action.payload;
    },

    setPageFontColor: (state, action) => {
      state.page.styles.fontColor = action.payload;
    },
    setPageFontFamily: (state, action) => {
      state.page.styles.fontFamily = action.payload;
    },
  },
});

export const {
  setPage,
  setPageLinks,
  setProfileTitle,
  setProfileDescription,
  setPageBackgroundType,
  setPageBackgroundColor,
  setPageLinkColor,
  setPageLinkBackgroundColor,
  setPageLinkBorderColor,
  setPageLinkShadowColor,
  setPageLinkStyle,
  setPageFontColor,
  setPageFontFamily,
} = panelSlice.actions;

export default panelSlice.reducer;
