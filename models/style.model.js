import mongoose from "mongoose";

const StyleSchema = new mongoose.Schema({
  backgroundColor: {
    type: String,
    default: "",
  },

  backgroundImageUrl: {
    type: String,
    default: "",
  },

  profileImage: {
    color: {
      type: String,
      default: "",
    },
    backgroundColor: {
      type: String,
      default: "",
    },
  },

  profileTitle: {
    color: {
      type: String,
      default: "",
    },
    fontSize: {
      type: String,
      default: "",
    },
    fontWeight: {
      type: String,
      default: "",
    },
    fontFamily: {
      type: String,
      default: "",
    },
  },

  profileDescription: {
    color: {
      type: String,
      default: "",
    },
    fontSize: {
      type: String,
      default: "",
    },
    fontWeight: {
      type: String,
      default: "",
    },
    fontFamily: {
      type: String,
      default: "",
    },
  },

  link: {
    color: {
      type: String,
      default: "",
    },
    backgroundColor: {
      type: String,
      default: "",
    },
    fontSize: {
      type: String,
      default: "",
    },
    fontWeight: {
      type: String,
      default: "",
    },
    fontFamily: {
      type: String,
      default: "",
    },
    minHeight: {
      type: String,
      default: "",
    },
  },
});

export {StyleSchema}

export default mongoose.models.Style || mongoose.model("Style", StyleSchema);
