import { Schema, InferSchemaType, model } from 'mongoose';

const PageLoadedLogSchema = new Schema(
  {
    page: {
      type: String,
      index: true,
    },
    browserId: {
      type: String,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

export type IPageLoadedLog = InferSchemaType<typeof PageLoadedLogSchema>;

const PageLoadedLogModel = model('PageLoadedLog', PageLoadedLogSchema);

export default PageLoadedLogModel;
