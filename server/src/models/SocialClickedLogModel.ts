import { Schema, InferSchemaType, model } from 'mongoose';

const SocialClickedLogSchema = new Schema(
  {
    page: {
      type: String,
      index: true,
    },
    browserId: {
      type: String,
      index: true,
    },
    socialType: {
      type: Number,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { versionKey: false },
);

export type ISocialClickedLog = InferSchemaType<typeof SocialClickedLogSchema>;

const SocialClickedLogModel = model('SocialClickedLog', SocialClickedLogSchema);

export default SocialClickedLogModel;
