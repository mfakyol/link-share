import { createSlice, current } from "@reduxjs/toolkit";

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

    setProfileImage: (state, action) => {
      state.page.profileImage = action.payload;
    },

    setPageLinks: (state, action) => {
      state.page.links = action.payload;
    },

    removeLink: (state, action) => {
      const linkId = action.payload;
      state.page.links = state.page.links.filter((link) => link._id != linkId);
    },

    setPageSocials: (state, action) => {
      state.page.socials = action.payload;
    },

    setPageSocialShow: (state, action) => {
      const index = state.page.socials.findIndex((social) => social._id == action.payload.id);
      if (index > -1) {
        state.page.socials[index].show = action.payload.show;
      }
    },

    setPageSocialPosition: (state, action) => {
      state.page.styles.social.position = action.payload.position;
    },

    setPageSocialStyle: (state, action) => {
      state.page.styles.social.style = action.payload.style;
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
    setPageBackgroundImage: (state, action) => {
      state.page.styles.backgroundImage = action.payload;
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

    updatePageLink: (state, action) => {
      let linkIndex = state.page.links.findIndex((l) => l._id == action.payload._id);
      if (linkIndex > -1) state.page.links[linkIndex] = action.payload;
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
  setProfileImage,
  setPageLinks,
  removeLink,
  setPageSocials,
  setPageSocialShow,
  setPageSocialPosition,
  setPageSocialStyle,
  updatePageLink,
  setProfileTitle,
  setProfileDescription,
  setPageBackgroundType,
  setPageBackgroundImage,
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
