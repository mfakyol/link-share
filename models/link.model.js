import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export { LinkSchema };

export default mongoose.models.Link || mongoose.model("Link", LinkSchema);
