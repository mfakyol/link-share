import { Schema, InferSchemaType, model } from 'mongoose';

const LinkClickedLogSchema = new Schema(
  {
    page: {
      type: String,
      index: true,
    },
    browserId: {
      type: String,
      index: true,
    },
    linkId: {
      type: String,
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

export type ILinkClickedLog = InferSchemaType<typeof LinkClickedLogSchema>;

const LinkClickedLogModel = model('LinkClickedLog', LinkClickedLogSchema);

export default LinkClickedLogModel;
